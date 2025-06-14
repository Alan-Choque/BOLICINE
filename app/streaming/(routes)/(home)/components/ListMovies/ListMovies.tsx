"use client";

// Este componente debe ser simple y solo pasar datos a BlockMovies.
import { BlockMovies } from "@/components/Shared/BlockMovies";
import { ListMoviesProps } from "./ListMovies.types";

// Debe recibir 'title' y 'movies' como props.
export function ListMovies(props: ListMoviesProps) {
    const { movies, title, isMyList } = props;

    // Si no hay películas, no se renderiza nada.
    if (!movies || movies.length === 0) {
        return null;
    }
    

    // Solo debe renderizar UN BlockMovies, usando las props que recibe.
    // Toda la lógica de 'useLovedFilms' DEBE SER ELIMINADA de este archivo.
    return (
        <BlockMovies
            title={title} // Usa el título que viene de las props
            movies={movies}
            isMyList={isMyList || false}
        />
    );
}