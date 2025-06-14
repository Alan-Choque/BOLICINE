import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database"; // Asegúrate de que la ruta a tu conexión de BD sea correcta
import { Movie } from "@/types/movies"; // Importa tu tipo Movie para asegurar que la respuesta tenga la forma correcta

// Esta es la función que se ejecutará cuando se haga una petición GET a /api/search
export async function GET(request: NextRequest) {
    try {
        // 1. Obtener el parámetro de búsqueda de la URL (?q=...)
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        // 2. Validar la entrada: si no hay consulta, no hay nada que buscar.
        if (!query) {
            return NextResponse.json(
                { message: "El parámetro de búsqueda 'q' es requerido." },
                { status: 400 } // 400 Bad Request
            );
        }

        // 3. Preparar el término de búsqueda para la consulta SQL con wildcards (%)
        // Esto buscará el 'query' en cualquier parte del título.
        const searchTerm = `%${query}%`;

        // 4. Ejecutar la consulta a la base de datos
        // Usamos la misma estructura de tu función getMoviesWithDetails para que los datos sean consistentes.
        const [moviesResult] = await db.query<any[]>(`
            SELECT
                p.id_pelicula, p.titulo, p.sinopsis, p.duracion,
                p.fecha_lanzamiento, p.tipo_contenido, p.imagen_portada,
                p.url_video, p.id_clasificacion, c.codigo AS age,
                p.calificacion_promedio, p.ranking,
                GROUP_CONCAT(DISTINCT g.nombre_genero SEPARATOR ',') AS genreNames
            FROM
                peliculas AS p
            LEFT JOIN
                clasificaciones AS c ON p.id_clasificacion = c.id_clasificacion
            LEFT JOIN
                peliculas_generos AS pg ON p.id_pelicula = pg.id_pelicula
            LEFT JOIN
                generos AS g ON pg.id_genero = g.id_genero
            WHERE
                p.titulo LIKE ?  -- La condición de búsqueda
            GROUP BY
                p.id_pelicula
            LIMIT 10 -- Es una buena práctica limitar los resultados de la búsqueda
        `, [searchTerm]); // Pasamos el término como un parámetro para prevenir SQL Injection

        // 5. Mapear los resultados al formato de tu tipo `Movie`
        return moviesResult.map(row => ({
            id_pelicula: row.id_pelicula,
            titulo: row.titulo,
            sinopsis: row.sinopsis,
            duracion: row.duracion,
            fecha_lanzamiento: row.fecha_lanzamiento,
            tipo_contenido: row.tipo_contenido,
            imagen_portada: row.imagen_portada,
            url_video: row.url_video,
            id_clasificacion: row.id_clasificacion,
            age: row.age,
            calificacion_promedio: row.calificacion_promedio,
            ranking: row.ranking,
            genres: row.genreNames ? row.genreNames.split(',') : [],
        }));


    } catch (error) {
        console.error("Error en el endpoint de búsqueda:", error);

        // 7. Si algo sale mal, devolver un error 500
        return NextResponse.json(
            { message: "Error interno del servidor." },
            { status: 500 }
        );
    }
}