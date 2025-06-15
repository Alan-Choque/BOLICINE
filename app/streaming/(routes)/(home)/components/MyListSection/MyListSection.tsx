"use client";

import { useLovedFilms } from "@/hooks/use-loved-films";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";
import { ListMovies } from "../ListMovies";
import { Movie } from "@/types/movies";

export function MyListSection() {
    const { lovedFilmsByUser } = useLovedFilms();
    const { currentUser } = useCurrentNetflixUser();
    const userNetflixId = currentUser?.id;
    let lovedFilms: Movie[] = [];
    if (userNetflixId && lovedFilmsByUser) {
        lovedFilms = lovedFilmsByUser[userNetflixId] ?? [];
    }
    if (lovedFilms.length === 0) {
        return (
            <div className="text-center text-gray-400 mt-10">
                <p className="text-xl">Tu lista está vacía.</p>
                <p className="text-md mt-2">Añade series y películas a `Mi Lista` para verlas aquí.</p>
            </div>
        );
    }
    return (
        <ListMovies
            title="Mi Lista"
            movies={lovedFilms}
            isMyList={true}
        />
    );
}