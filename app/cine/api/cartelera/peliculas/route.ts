import { db } from "@/lib/db";
import { z } from "zod";
import { successResponse, errorResponse } from "@/lib/api-response";

const querySchema = z.object({
  genero: z.string().optional(),
  clasificacion: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedParams = querySchema.safeParse({
      genero: searchParams.get("genero"),
      clasificacion: searchParams.get("clasificacion"),
    });

    if (!parsedParams.success) {
      return errorResponse("Parámetros inválidos", 400);
    }

    let query = `
      SELECT p.*, GROUP_CONCAT(DISTINCT g.nombre_genero) AS generos
      FROM peliculas p
      LEFT JOIN peliculas_generos pg ON p.id_pelicula = pg.id_pelicula
      LEFT JOIN generos g ON pg.id_genero = g.id_genero
      WHERE p.tipo_contenido IN ('cine', 'ambos')
    `;

    const params = [];

    if (parsedParams.data.genero) {
      query += " AND g.id_genero = ?";
      params.push(parsedParams.data.genero);
    }

    if (parsedParams.data.clasificacion) {
      query += " AND p.id_clasificacion = ?";
      params.push(parsedParams.data.clasificacion);
    }

    query += " GROUP BY p.id_pelicula";

    const [rows] = await db.query(query, params);
    const peliculas = rows as any[];

    return successResponse(peliculas);
  } catch (error) {
    return errorResponse("Error al obtener las películas", 500, error);
  }
}
