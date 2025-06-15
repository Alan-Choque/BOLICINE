import { db } from "@/lib/database";
import { Movie } from "@/types/movies";
interface GetRandomMoviesOptions {
    limit?: number;
}

export async function getRandomMovies(options: GetRandomMoviesOptions = {}): Promise<Movie[]> {
    const { limit = 20 } = options;
    const query = `
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
        GROUP BY
            p.id_pelicula
        ORDER BY
            RAND() -- ✨ ¡ESTA ES LA LÍNEA CLAVE! ✨
        LIMIT ? -- Limitamos el número de resultados para un buen rendimiento
    `;
    
    try {
        const [moviesResult] = await db.query<any[]>(query, [limit]);
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
        })) as Movie[];
    } catch (error) {
        console.error("Error al obtener las películas aleatorias:", error);
        return [];
    }
}
export async function getMovieById(movieId: string | number): Promise<Movie | null> {
    // La consulta es la misma que usas para obtener listas, pero con un WHERE específico.
    const query = `
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
            p.id_pelicula = ? -- Filtramos por el ID de la película
        GROUP BY
            p.id_pelicula
        LIMIT 1; -- Solo esperamos un resultado
    `;

    try {
        const [rows] = await db.query<any[]>(query, [movieId]);
        if (rows.length === 0) {
            return null;
        }
        const movieData = rows[0];
        const movie: Movie = {
            id_pelicula: movieData.id_pelicula,
            titulo: movieData.titulo,
            sinopsis: movieData.sinopsis,
            duracion: movieData.duracion,
            fecha_lanzamiento: movieData.fecha_lanzamiento,
            tipo_contenido: movieData.tipo_contenido,
            imagen_portada: movieData.imagen_portada,
            url_video: movieData.url_video,
            id_clasificacion: movieData.id_clasificacion,
            age: movieData.age,
            calificacion_promedio: movieData.calificacion_promedio,
            ranking: movieData.ranking,
            genres: movieData.genreNames ? movieData.genreNames.split(',') : [],
        };

        return movie;

    } catch (error) {
        console.error("Error al obtener la película por ID:", error);
        return null; // En caso de un error en la base de datos, también devolvemos null.
    }
}

export async function getPopularMovieById(movieId: string | number): Promise<Movie | null> {
    const query = `
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
            p.id_pelicula = ? AND p.ranking IS NOT NULL -- ✨ La única diferencia está aquí
        GROUP BY
            p.id_pelicula
        LIMIT 1;
    `;

    try {
        const [rows] = await db.query<any[]>(query, [movieId]);
        if (rows.length === 0) {
            return null;
        }
        const movieData = rows[0];
        const movie: Movie = {
            id_pelicula: movieData.id_pelicula,
            titulo: movieData.titulo,
            sinopsis: movieData.sinopsis,
            duracion: movieData.duracion,
            fecha_lanzamiento: movieData.fecha_lanzamiento,
            tipo_contenido: movieData.tipo_contenido,
            imagen_portada: movieData.imagen_portada,
            url_video: movieData.url_video,
            id_clasificacion: movieData.id_clasificacion,
            age: movieData.age,
            calificacion_promedio: movieData.calificacion_promedio,
            ranking: movieData.ranking,
            genres: movieData.genreNames ? movieData.genreNames.split(',') : [],
        };
        
        return movie;

    } catch (error) {
        console.error("Error al obtener la película popular por ID:", error);
        return null;
    }
}
