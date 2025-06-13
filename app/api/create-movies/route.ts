// app/api/create-movies/route.ts
import { db } from "@/lib/database"; // Tu conexión MySQL
import { NextResponse } from "next/server";
import { Movie } from "@/types/movies"; // Importa el tipo Movie

export async function POST(req: Request) {
  const { movies }: { movies: Movie[] } = await req.json();

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return new NextResponse("Movies data is required and must be an array.", {
      status: 400,
    });
  }

  try {
    const insertedMovieIds: number[] = [];

    for (const movie of movies) {
      const {
        titulo,
        sinopsis,
        duracion,
        fecha_lanzamiento,
        id_productora,
        tipo_contenido,
        imagen_portada,
        url_video,
        id_clasificacion,
        calificacion_promedio,
      } = movie;

      if (
        !titulo ||
        !sinopsis ||
        !duracion ||
        !fecha_lanzamiento ||
        !id_productora ||
        !tipo_contenido ||
        !imagen_portada ||
        !url_video ||
        !id_clasificacion
      ) {
        console.error("Missing required fields for movie:", titulo, movie);
        throw new Error(`Missing required data for movie: ${titulo || 'Unknown Title'}`);
      }

      const query = `
        INSERT INTO peliculas (
          titulo,
          sinopsis,
          duracion,
          fecha_lanzamiento,
          id_productora,
          tipo_contenido,
          imagen_portada,
          url_video,
          id_clasificacion,
          calificacion_promedio
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        titulo,
        sinopsis,
        duracion,
        fecha_lanzamiento,
        id_productora,
        tipo_contenido,
        imagen_portada,
        url_video,
        id_clasificacion,
        calificacion_promedio || null,
      ];

      const [result] = await db.query(query, values);
      const newId = (result as any).insertId;
      insertedMovieIds.push(newId);
    }

    return NextResponse.json({ message: "Movies created successfully", ids: insertedMovieIds }, { status: 201 });
  } catch (error) {
    console.error("Error creating movies:", error);
    return new NextResponse("Internal Server Error: " + (error as Error).message, { status: 500 });
  }
}