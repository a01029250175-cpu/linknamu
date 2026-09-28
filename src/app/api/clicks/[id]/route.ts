import { profile } from "@/data/profile";
import { getDb } from "@/lib/mongodb";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 등록된 링크만 집계 (임의의 id로 문서가 쌓이는 것 방지)
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크" }, { status: 404 });
  }

  try {
    const db = await getDb();
    await db
      .collection("clicks")
      .updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ error: "클릭 수 저장 실패" }, { status: 500 });
  }
}
