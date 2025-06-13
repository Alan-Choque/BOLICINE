// types/movie.ts
export interface Movie {
  id_pelicula: number;
  titulo: string;
  sinopsis: string;
  duracion: number;
  fecha_lanzamiento: string;
  id_productora: number | null;
  tipo_contenido: string;
  imagen_portada: string | null;
  url_video: string | null;
  id_clasificacion: number | null;
  calificacion_promedio: number | null; 
  ranking?: number | null;
  age: string;
  genres: string[];
}