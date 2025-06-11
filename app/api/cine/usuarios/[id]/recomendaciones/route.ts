import { getRecommendations } from "@/lib/ai/recommender";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
  }

  try {
    const recs = await getRecommendations(userId);
    return new Response(JSON.stringify(recs), { status: 200 });
  } catch (err: any) {
    console.error("Error al consultar recomendaciones IA:", err);
    return new Response(JSON.stringify({ error: "Error al obtener recomendaciones" }), { status: 500 });
  }
}