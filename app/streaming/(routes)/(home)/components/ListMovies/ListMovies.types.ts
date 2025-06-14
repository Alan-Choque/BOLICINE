import { Movie } from "@/types/movies";

export interface ListMoviesProps {
    movies: Movie[];
    title: string; // <-- Prop para el título dinámico
    isMyList?: boolean; // <-- Prop opcional para saber si es la lista de favoritos
}