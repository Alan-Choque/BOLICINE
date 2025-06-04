import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query("SELECT * FROM cines WHERE id_cine = ?", [
      params.id,
    ]);
    const cine = rows as any[];

    if (cine.length === 0) {
      return errorResponse("Cine no encontrado", 404);
    }

    return successResponse(cine[0]);
  } catch (error) {
    return errorResponse("Error al obtener el cine", 500, error);
  }
}
