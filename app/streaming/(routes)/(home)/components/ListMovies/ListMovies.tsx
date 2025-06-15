"use client";

import { BlockMovies } from "@/components/Shared/BlockMovies";
import { ListMoviesProps } from "./ListMovies.types";
export function ListMovies(props: ListMoviesProps) {
    const { movies, title, isMyList } = props;
    if (!movies || movies.length === 0) {
        return null;
    }
    return (
        <BlockMovies
            title={title}
            movies={movies}
            isMyList={isMyList || false}
        />
    );
}