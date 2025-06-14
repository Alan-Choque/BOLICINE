"use client";

import { useLovedFilms } from "@/hooks/use-loved-films";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";
import { ListMovies } from "../ListMovies"; // <-- Reutilizamos nuestro nuevo ListMovies genérico
import { Movie } from "@/types/movies";

export function MyListSection() {
    const { lovedFilmsByUser } = useLovedFilms();
    const { currentUser } = useCurrentNetflixUser();

    const userNetflixId = currentUser?.id;
    const lovedFilms: Movie[] = userNetflixId ? lovedFilmsByUser[userNetflixId] : [];

    // Si no hay películas en "Mi Lista", no mostramos nada.
    if (lovedFilms.length === 0) {
        return null;
    }

    // Ahora llamamos a nuestro ListMovies genérico para mostrar los datos
    return (
        <ListMovies
            title="Mi Lista"
            movies={lovedFilms}
            isMyList={true}
        />
    );
}