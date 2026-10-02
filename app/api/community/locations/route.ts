import { getD1 } from "../../../../db";
import { locationRecordCounts } from "../../../../db/community-records";

export async function GET() {
  try {
    return Response.json({ counts: await locationRecordCounts(getD1()) }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "Field record counts are temporarily unavailable." }, { status: 503 });
  }
}
