import { profile } from "@/data/profile";
import { getDb } from "@/lib/mongodb";

/** 등록된 모든 링크의 클릭 수를 { [linkId]: count } 형태로 한 번에 반환 */
export async function GET() {
  const ids = profile.links.map((link) => link.id);

  try {
    const db = await getDb();
    const docs = await db
      .collection<{ linkId: string; count: number }>("clicks")
      .find({ linkId: { $in: ids } })
      .toArray();

    const counts: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
    for (const doc of docs) {
      counts[doc.linkId] = doc.count;
    }
    return Response.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수 조회 실패" }, { status: 500 });
  }
}
