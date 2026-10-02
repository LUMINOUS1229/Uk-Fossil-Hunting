export const allowedLocations = new Set([
  "folkestone", "herne-bay", "walton", "wootton-bassett", "bracklesham",
  "isle-of-wight", "charmouth", "weymouth", "peterborough", "nacton",
  "fort-victoria", "barton-on-sea", "warden-point", "abbey-wood", "grange-chine",
  "hastings", "ardley-quarry", "kirtlington-quarry", "woodeaton-quarry", "whitby", "lyme-regis",
]);

type Database = { prepare: (sql: string) => {
  bind: (...values: (string | number)[]) => { all: <T>() => Promise<{ results: T[] }> };
} };
type RecordRow = { id: string; author: string; body: string; locationId: string | null; imageKeys: string; createdAt: string; appreciations: number };
export type RecordCursor = { createdAt: string; id: string };

export async function locationRecordCounts(db: Database) {
  const { results } = await db.prepare("SELECT location_id AS locationId, COUNT(*) AS total FROM community_posts WHERE location_id IS NOT NULL GROUP BY location_id").bind().all<{ locationId: string; total: number }>();
  return Object.fromEntries(results.filter(row => allowedLocations.has(row.locationId)).map(row => [row.locationId, Number(row.total)]));
}

export async function listRecords(db: Database, locationId: string, cursor: RecordCursor | null) {
  const clauses: string[] = [];
  const values: (string | number)[] = [];
  if (locationId) { clauses.push("location_id = ?"); values.push(locationId); }
  if (cursor) {
    clauses.push("(created_at < ? OR (created_at = ? AND id < ?))");
    values.push(cursor.createdAt, cursor.createdAt, cursor.id);
  }
  const { results } = await db.prepare(`SELECT id, author, body, location_id AS locationId, image_keys AS imageKeys, created_at AS createdAt, appreciations FROM community_posts ${clauses.length ? `WHERE ${clauses.join(" AND ")}` : ""} ORDER BY created_at DESC, id DESC LIMIT 25`).bind(...values).all<RecordRow>();
  const rows = results.slice(0, 24);
  const last = rows.at(-1);
  return { rows, nextCursor: results.length > 24 && last ? { createdAt: last.createdAt, id: last.id } : null };
}
