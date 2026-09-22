import { getD1 } from "../../../db";

const visitIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function countVisits() {
  const row = await getD1().prepare("SELECT COUNT(*) AS total FROM site_visits").first<{ total: number }>();
  return Number(row?.total ?? 0);
}

function result(total: number) {
  return Response.json({ total }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  try {
    return result(await countVisits());
  } catch (error) {
    console.error("Failed to read site visit count", error);
    return Response.json({ error: "Visit count is temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length")) > 256) {
      return Response.json({ error: "Invalid visit id." }, { status: 400 });
    }
    const payload = await request.json() as { visitId?: unknown };
    if (typeof payload.visitId !== "string" || !visitIdPattern.test(payload.visitId)) {
      return Response.json({ error: "Invalid visit id." }, { status: 400 });
    }

    await getD1().prepare("INSERT OR IGNORE INTO site_visits (visit_id) VALUES (?)")
      .bind(payload.visitId).run();
    return result(await countVisits());
  } catch (error) {
    console.error("Failed to record site visit", error);
    return Response.json({ error: "Visit count is temporarily unavailable." }, { status: 503 });
  }
}
