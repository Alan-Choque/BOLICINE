import {redirect} from "next/navigation";
import {db} from "@/lib/database";

import { auth } from "@/auth";
import { Perfil } from "./(routes)/profiles/components/Profiles/Profiles.types";
import { RowDataPacket } from 'mysql2';
import { Navbar } from "@/components/Shared/Navbar";
import { TrendingMovies } from "./(routes)/(home)/components/TrendingMovies";
import { MyListSection } from "./(routes)/(home)/components/MyListSection";
import { ListMovies } from "../streaming/(routes)/(home)/components/ListMovies";
import {Movie} from "@/types/movies";
import { getRandomMovies } from "@/data/movies";
import SliderVideo from "../streaming/(routes)/(home)/components/SliderVideo/SliderVideo";

export default async function StreamingPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/streaming/login");
  }

  let userProfiles: Perfil[] = []; 

  try {
    // 1. Obtener el `id_usuario` numérico de la tabla `usuarios`
    const [userRows] = await db.query<RowDataPacket[]>(
      // Asumo que tu tabla `usuarios` tiene una columna `id` que guarda el ID de NextAuth (string)
      `SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1`, 
      [session.user.email] 
    );

    const id_usuario = (userRows[0] as { id_usuario: number })?.id_usuario;

    if (!id_usuario) {
        console.error("No se encontró id_usuario para el usuario autenticado (email):", session.user.email);
        redirect("/streaming/login"); // Si no encontramos el ID de usuario, redirigimos.
    }

    // 2. Consulta la tabla `perfiles` para obtener los perfiles asociados a ese `id_usuario`
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id_perfil AS id, nombre_perfil AS profileName, avatar_url AS avatarUrl
        FROM perfiles
        WHERE id_usuario = ?`,
      [id_usuario] 
    );

    // Mapea los resultados de la base de datos a tu tipo `Perfil`
    userProfiles = rows.map(row => ({
      id: row.id,
      profileName: row.profileName,
      avatarUrl: row.avatarUrl,
      // Si el componente `Profiles` necesita el `userId` de NextAuth, lo añades aquí
      // userId: session.user!.id 
    }));

  } catch (error) {
    console.error("Error al obtener perfiles de usuario desde MySQL:", error);
    redirect("/error-loading-profiles"); // Redirige a una página de error o muestra un mensaje
  }
  console.log(userProfiles);
  async function getMoviesWithDetails(isTrending: boolean = false): Promise<Movie[]> {
    const whereClause = isTrending ? "WHERE p.ranking IS NOT NULL" : "WHERE p.ranking IS NULL";
    const orderByClause = isTrending ? "ORDER BY p.ranking ASC" : "";

    const [moviesResult] = await db.query<any[]>(`
      SELECT
        p.id_pelicula,
        p.titulo,
        p.sinopsis,
        p.duracion,
        p.fecha_lanzamiento,
        p.id_productora,
        p.tipo_contenido,
        p.imagen_portada,
        p.url_video,
        p.id_clasificacion,
        c.codigo AS age,
        p.calificacion_promedio,
        p.ranking,
        GROUP_CONCAT(g.nombre_genero SEPARATOR ',') AS genreNames
      FROM
        peliculas AS p
      LEFT JOIN
        clasificaciones AS c ON p.id_clasificacion = c.id_clasificacion
      LEFT JOIN
        peliculas_generos AS pg ON p.id_pelicula = pg.id_pelicula
      LEFT JOIN
        generos AS g ON pg.id_genero = g.id_genero
      ${whereClause}
      GROUP BY
        p.id_pelicula, p.titulo, p.sinopsis, p.duracion, p.fecha_lanzamiento,
        p.id_productora, p.tipo_contenido, p.imagen_portada, p.url_video,
        p.id_clasificacion, c.codigo, p.calificacion_promedio, p.ranking
      ${orderByClause}
    `);
      console.log("Datos brutos de la base de datos (primeros 3 resultados):");
    moviesResult.slice(0, 3).forEach(row => {
        console.log(`id_pelicula: ${row.id_pelicula}, id_clasificacion: ${row.id_clasificacion}, age (desde DB): ${row.age}`);
    })
    // Post-procesamiento para convertir 'genreNames' de string a string[] y mapear a Movie
    return moviesResult.map(row => ({
      // Mapea directamente las propiedades que ya vienen correctas del SQL
      id_pelicula: row.id_pelicula,
      titulo: row.titulo,
      sinopsis: row.sinopsis,
      duracion: row.duracion,
      fecha_lanzamiento: row.fecha_lanzamiento,
      id_productora: row.id_productora,
      tipo_contenido: row.tipo_contenido,
      imagen_portada: row.imagen_portada,
      url_video: row.url_video,
      id_clasificacion: row.id_clasificacion,
      age: row.age,
      calificacion_promedio: row.calificacion_promedio,
      ranking: row.ranking,// Ya es un string por el AS age en el SQL
      genres: row.genreNames ? row.genreNames.split(',') : [], // Divide la cadena de géneros
    })) as Movie[];
  }

  let movies: Movie[] = [];
  try {
    movies = await getMoviesWithDetails(false);
  } catch (error) {
    console.error("Error al obtener películas normales:", error);
  }

  let trendingMovies: Movie[] = [];
  try {
    trendingMovies = await getMoviesWithDetails(true);
  } catch (error) {
    console.error("Error al obtener películas populares:", error);
  }
  const genresToDisplay = ["Acción", "Comedia", "Terror", "Ciencia ficción"];
  const classificationsToDisplay = {
        "TP": "Para todo público",
        "M-13": "Recomendado para mayores de 13",
        // Añade más mapeos si los necesitas
    };

    // 2. Objeto que almacenará nuestras listas de películas
    const moviesByCategory: { [key: string]: Movie[] } = {};

    // 3. Itera sobre el array `movies` que ya tienes y agrúpalas
    movies.forEach(movie => {
        // Agrupar por género
        movie.genres.forEach(genre => {
            if (genresToDisplay.includes(genre)) {
                // Si la categoría (ej: "Acción") no existe en nuestro objeto, la creamos
                if (!moviesByCategory[genre]) {
                    moviesByCategory[genre] = [];
                }
                // Añadimos la película a su categoría
                moviesByCategory[genre].push(movie);
            }
        });

        // Agrupar por clasificación
        const classificationTitle = classificationsToDisplay[movie.age as keyof typeof classificationsToDisplay];
        if (classificationTitle) {
            if (!moviesByCategory[classificationTitle]) {
                moviesByCategory[classificationTitle] = [];
            }
            moviesByCategory[classificationTitle].push(movie);
        }
    });
    const titleMap: { [key: string]: string } = {
        "Acción": "Acción que te dejará sin aliento",
        "Comedia": "Comedias para no parar de reír",
        "Terror": "Terror que no te dejará dormir",
        "Ciencia ficción": "Viajes a otros mundos: Ciencia Ficción",
        "Para todo público": "Diversión para toda la familia",
        "Recomendado para mayores de 13": "Contenido para adolescentes y más",
        // Añade más mapeos para todas tus categorías
    };
    const recommendedMovies = await getRandomMovies({ limit: 20 });
    return (
      <div className="relative bg-zinc-900">
        <Navbar users={userProfiles} />
        <SliderVideo/>
        <TrendingMovies movies={trendingMovies} />
        <div className="py-8 space-y-6 md:space-y-6">
                
                
                {/* Carrusel de "Mi Lista" (con lógica de cliente) */}
                <MyListSection />
                {recommendedMovies.length > 0 &&
                <ListMovies title="Recomendados para ti" movies={recommendedMovies} />
                }
                {/* Carruseles dinámicos por Género y Clasificación */}
                {Object.entries(moviesByCategory).map(([category, movieList]) => {
                  const displayTitle = titleMap[category] || category;
                  return (
                    movieList.length > 0 && (
                      <ListMovies 
                          key={category} 
                          title= {displayTitle} 
                          movies={movieList}
                          isMyList={false}
                      />
                      )
                    )
                })}
            </div>
      </div>
  );
}
