import { Movie } from "@/types/movies";

export type ActionsButtonsProps = {
    movieId: number;
    movie: Movie;
    isMyList: boolean;
};