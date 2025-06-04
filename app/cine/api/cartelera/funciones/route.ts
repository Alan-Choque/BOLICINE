import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query(
      `SELECT f.*, p.titulo, p.imagen_portada, s.nombre_sala, c.nombre_cine 
       FROM funciones f
       JOIN peliculas p ON f.id_pelicula = p.id_pelicula
       JOIN salas s ON f.id_sala = s.id_sala
       JOIN cines c ON s.id_cine = c.id_cine
       WHERE f.id_funcion = ?`,
      [params.id]
    );

    const funcion = Array.isArray(rows) ? rows[0] : rows;

    if (!funcion) {
      return errorResponse("Función no encontrada", 404);
    }

    return successResponse(funcion);
  } catch (error) {
    return errorResponse("Error al obtener la función", 500, error);
  }
}
