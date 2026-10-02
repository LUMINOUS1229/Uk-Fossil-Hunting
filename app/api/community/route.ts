import { and, count, eq, gte } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb, getD1 } from "../../../db";
import { allowedLocations, listRecords, type RecordCursor } from "../../../db/community-records";
import { communityPosts } from "../../../db/schema";

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 1_572_864;
const MAX_REQUEST_BYTES = 5_250_000;
const MAX_POSTS_PER_DAY = 4;
const profilePattern = /^[a-zA-Z0-9_-]{12,80}$/;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

type UploadBucket = {
  put: (key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }) => Promise<unknown>;
  delete: (keys: string | string[]) => Promise<unknown>;
};

function uploadsBucket() {
  return (env as unknown as { UPLOADS?: UploadBucket }).UPLOADS;
}

function cleanText(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function parseImageKeys(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string").slice(0, MAX_IMAGES) : [];
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locationId = params.get("locationId") ?? "";
  let cursor: RecordCursor | null = null;
  if (locationId && !allowedLocations.has(locationId)) return Response.json({ error: "Unknown field region." }, { status: 400 });
  if (params.has("cursor")) {
    try {
      const value = JSON.parse(params.get("cursor")!);
      if (!value || typeof value.createdAt !== "string" || typeof value.id !== "string" || value.createdAt.length > 40 || value.id.length > 80) throw new Error();
      cursor = { createdAt: value.createdAt, id: value.id };
    } catch { return Response.json({ error: "Invalid page cursor." }, { status: 400 }); }
  }
  try {
  const { rows, nextCursor } = await listRecords(getD1(), locationId, cursor);
  return Response.json({ posts: rows.map((row) => ({
    id: row.id,
    author: row.author,
    body: row.body,
    locationId: row.locationId,
    imageUrls: parseImageKeys(row.imageKeys).map((key) => `/api/community-images/${encodeURIComponent(key)}`),
    createdAt: row.createdAt,
    appreciations: row.appreciations,
  })), nextCursor }, {
    headers: { "cache-control": "no-store" },
  });
  } catch { return Response.json({ error: "Field notes are temporarily unavailable." }, { status: 503 }); }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Upload is larger than the 5 MB post limit." }, { status: 413 });
  }

  const form = await request.formData();
  const profileId = cleanText(form.get("profileId"), 80);
  const author = cleanText(form.get("author"), 20);
  const body = cleanText(form.get("body"), 800);
  const requestedLocation = cleanText(form.get("locationId"), 40);
  const locationId = allowedLocations.has(requestedLocation) ? requestedLocation : null;
  if (requestedLocation && !locationId) return Response.json({ error: "Unknown field region." }, { status: 400 });
  const images = form.getAll("images").filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!profilePattern.test(profileId)) {
    return Response.json({ error: "A valid anonymous profile is required." }, { status: 400 });
  }
  if (author.length < 2 || body.length < 4) {
    return Response.json({ error: "Please add a name and a short field note." }, { status: 400 });
  }
  if (images.length === 0 || images.length > MAX_IMAGES) {
    return Response.json({ error: `Add 1–${MAX_IMAGES} photos.` }, { status: 400 });
  }
  if (images.some((file) => !allowedImageTypes.has(file.type) || file.size > MAX_IMAGE_BYTES)) {
    return Response.json({ error: "Photos must be JPEG, PNG or WebP and no more than 1.5 MB each." }, { status: 413 });
  }

  const db = getDb();
  const since = new Date(Date.now() - 86_400_000).toISOString();
  const [recent] = await db.select({ value: count() }).from(communityPosts).where(and(
    eq(communityPosts.profileId, profileId),
    gte(communityPosts.createdAt, since),
  ));
  if ((recent?.value ?? 0) >= MAX_POSTS_PER_DAY) {
    return Response.json({ error: "This device has reached the four-post daily limit." }, { status: 429 });
  }

  const bucket = uploadsBucket();
  if (!bucket) return Response.json({ error: "Photo storage is not available." }, { status: 503 });

  const postId = crypto.randomUUID();
  const imageKeys: string[] = [];
  try {
    for (const [index, file] of images.entries()) {
      const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const key = `community/${postId}-${index + 1}.${extension}`;
      await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
      imageKeys.push(key);
    }

    const createdAt = new Date().toISOString();
    await db.insert(communityPosts).values({
      id: postId,
      profileId,
      author,
      body,
      locationId,
      imageKeys: JSON.stringify(imageKeys),
      createdAt,
      appreciations: 0,
    });

    return Response.json({ id: postId, createdAt }, { status: 201 });
  } catch {
    if (imageKeys.length) await bucket.delete(imageKeys);
    return Response.json({ error: "Could not publish this field note. Please try again." }, { status: 500 });
  }
}
