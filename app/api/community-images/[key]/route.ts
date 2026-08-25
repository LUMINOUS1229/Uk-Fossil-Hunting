import { env } from "cloudflare:workers";

type StoredImage = {
  body: BodyInit;
  httpEtag?: string;
  httpMetadata?: { contentType?: string };
};

type UploadBucket = {
  get: (key: string) => Promise<StoredImage | null>;
};

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key: encodedKey } = await params;
  const key = decodeURIComponent(encodedKey);
  if (!/^community\/[a-f0-9-]{36}-[1-3]\.(?:jpg|png|webp)$/.test(key)) {
    return new Response("Not found", { status: 404 });
  }

  const bucket = (env as unknown as { UPLOADS?: UploadBucket }).UPLOADS;
  if (!bucket) return new Response("Photo storage unavailable", { status: 503 });
  const object = await bucket.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers({
    "content-type": object.httpMetadata?.contentType ?? "image/jpeg",
    "cache-control": "public, max-age=31536000, immutable",
    "x-content-type-options": "nosniff",
  });
  if (object.httpEtag) headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
}
