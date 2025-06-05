import { db } from "@/lib/database";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query(
      `SELECT s.*, c.nombre_cine, c.direccion 
       FROM salas s
       JOIN cines c ON s.id_cine = c.id_cine
       WHERE s.id_sala = ?`,
      [params.id]
    );

    const sala = (rows as any[])[0];

    if (!sala) {
      return errorResponse("Sala no encontrada", 404);
    }

    return successResponse(sala);
  } catch (error) {
    return errorResponse("Error al obtener la sala", 500, error);
  }
}
