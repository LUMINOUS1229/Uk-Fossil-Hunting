import { getD1 } from "../../../db";

const uuid = /^[0-9a-f-]{36}$/i;
const failure = () => Response.json({ error: "unavailable" }, { status: 503 });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId") || "";
  const offset = Number(url.searchParams.get("offset") || 0);
  if (!uuid.test(postId) || !Number.isSafeInteger(offset) || offset < 0) return Response.json({ error: "invalid" }, { status: 400 });
  try {
    const result = await getD1().prepare(`SELECT c.id, c.author, c.body, c.created_at AS createdAt,
      c.parent_id AS parentId, p.author AS replyTo FROM community_comments c
      LEFT JOIN community_comments p ON p.id = c.parent_id AND p.post_id = c.post_id
      WHERE c.post_id = ? ORDER BY c.created_at, c.id LIMIT 31 OFFSET ?`).bind(postId, offset).all();
    return Response.json({ comments: result.results.slice(0, 30), hasMore: result.results.length > 30 }, { headers: { "cache-control": "no-store" } });
  } catch (error) { console.error("Comments load failed", error); return failure(); }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "origin" }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 8192) return Response.json({ error: "size" }, { status: 413 });
  let data;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return Response.json({ error: "size" }, { status: 413 });
    data = JSON.parse(raw);
  } catch { return Response.json({ error: "invalid" }, { status: 400 }); }
  const { id, postId, parentId = null } = data || {};
  const author = typeof data?.author === "string" ? data.author.trim() : "";
  const body = typeof data?.body === "string" ? data.body.trim() : "";
  if (!uuid.test(id || "") || !uuid.test(postId || "") || (parentId !== null && !uuid.test(parentId)) || author.length < 2 || author.length > 20 || !body || body.length > 500) return Response.json({ error: "invalid" }, { status: 400 });
  try {
    const db = getD1();
    const ip = request.headers.get("cf-connecting-ip") || "local-preview";
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`field-comments:${ip}`));
    const clientHash = Array.from(new Uint8Array(hash), n => n.toString(16).padStart(2, "0")).join("");
    const existing = await db.prepare("SELECT id FROM community_comments WHERE id = ? AND client_hash = ?").bind(id, clientHash).first();
    if (existing) return Response.json({ id });
    if (!await db.prepare("SELECT id FROM community_posts WHERE id = ?").bind(postId).first()) return Response.json({ error: "post" }, { status: 404 });
    if (parentId && !await db.prepare("SELECT id FROM community_comments WHERE id = ? AND post_id = ?").bind(parentId, postId).first()) return Response.json({ error: "parent" }, { status: 400 });
    const now = Date.now();
    const result = await db.prepare(`INSERT INTO community_comments (id, post_id, parent_id, author, body, client_hash, created_at)
      SELECT ?, ?, ?, ?, ?, ?, ? WHERE
      (SELECT COUNT(*) FROM community_comments WHERE client_hash = ? AND created_at > ?) < 30
      AND NOT EXISTS (SELECT 1 FROM community_comments WHERE client_hash = ? AND created_at > ?)`)
      .bind(id, postId, parentId, author, body, clientHash, new Date(now).toISOString(), clientHash, new Date(now - 86400000).toISOString(), clientHash, new Date(now - 15000).toISOString()).run();
    if (!result.meta.changes) return Response.json({ error: "rate" }, { status: 429 });
    return Response.json({ id }, { status: 201 });
  } catch (error) { console.error("Comment save failed", error); return failure(); }
}
