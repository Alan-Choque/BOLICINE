import { db } from "@/lib/database";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [peliculaRows] = await db.query(
      `SELECT p.*, c.codigo AS clasificacion 
       FROM peliculas p
       LEFT JOIN clasificaciones c ON p.id_clasificacion = c.id_clasificacion
       WHERE p.id_pelicula = ?`,
      [params.id]
    );

    const pelicula = (peliculaRows as any[])[0];

    if (!pelicula) {
      return errorResponse("Película no encontrada", 404);
    }

    const [generosRows] = await db.query(
      `SELECT g.nombre_genero 
       FROM peliculas_generos pg
       JOIN generos g ON pg.id_genero = g.id_genero
       WHERE pg.id_pelicula = ?`,
      [params.id]
    );

    const [directoresRows] = await db.query(
      `SELECT d.nombre_director, d.apellido_director 
       FROM peliculas_directores pd
       JOIN directores d ON pd.id_director = d.id_director
       WHERE pd.id_pelicula = ?`,
      [params.id]
    );

    const [repartoRows] = await db.query(
      `SELECT a.nombre_actor, a.apellido_actor, r.rol 
       FROM reparto r
       JOIN actores a ON r.id_actor = a.id_actor
       WHERE r.id_pelicula = ?`,
      [params.id]
    );

    const peliculaCompleta = {
      ...pelicula,
      generos: (generosRows as any[]).map((g) => g.nombre_genero),
      directores: directoresRows as any[],
      reparto: repartoRows as any[],
    };

    return successResponse(peliculaCompleta);
  } catch (error) {
    return errorResponse("Error al obtener la película", 500, error);
  }
}
