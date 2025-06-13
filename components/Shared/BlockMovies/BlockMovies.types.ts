import { Movie } from "@/types/movies";

export type BlockMoviesProps = {
    title: string;
    movies: Movie[];
    isMyList: boolean;
};