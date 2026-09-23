import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { museumProgress } from "../../../db/schema";

const profilePattern = /^[a-zA-Z0-9_-]{12,80}$/;

function parseStringList(value: unknown, limit: number) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string" && item.length <= 120))].slice(0, limit);
}

function parseStoredList(value: string) {
  try {
    return parseStringList(JSON.parse(value), 120);
  } catch {
    return [];
  }
}

function validProfile(profileId: unknown): profileId is string {
  return typeof profileId === "string" && profilePattern.test(profileId);
}

export async function GET(request: Request) {
  const profileId = new URL(request.url).searchParams.get("profile");
  if (!validProfile(profileId)) {
    return Response.json({ error: "A valid profile id is required." }, { status: 400 });
  }

  const db = getDb();
  const [row] = await db.select().from(museumProgress).where(eq(museumProgress.profileId, profileId)).limit(1);

  return Response.json({
    visitedLocations: row ? parseStoredList(row.visitedLocations) : [],
    ownedFinds: row ? parseStoredList(row.ownedFinds) : [],
    updatedAt: row?.updatedAt ?? null,
  });
}

export async function POST(request: Request) {
  const payload = await request.json() as {
    profileId?: unknown;
    visitedLocations?: unknown;
    ownedFinds?: unknown;
  };

  if (!validProfile(payload.profileId)) {
    return Response.json({ error: "A valid profile id is required." }, { status: 400 });
  }

  const visitedLocations = parseStringList(payload.visitedLocations, 20);
  const ownedFinds = parseStringList(payload.ownedFinds, 120);
  const updatedAt = new Date().toISOString();
  const db = getDb();

  await db.insert(museumProgress).values({
    profileId: payload.profileId,
    visitedLocations: JSON.stringify(visitedLocations),
    ownedFinds: JSON.stringify(ownedFinds),
    updatedAt,
  }).onConflictDoUpdate({
    target: museumProgress.profileId,
    set: {
      visitedLocations: JSON.stringify(visitedLocations),
      ownedFinds: JSON.stringify(ownedFinds),
      updatedAt,
    },
  });

  return Response.json({ visitedLocations, ownedFinds, updatedAt });
}
