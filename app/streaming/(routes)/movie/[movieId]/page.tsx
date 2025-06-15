
import { redirect } from "next/navigation";
import { getPopularMovieById } from '@/data/movies';
import { NavbarFilm } from "./components/NavbarFilm";
import { MovieVideo } from "./components/MovieVideo";
import { getMovieById } from '@/data/movies';
export default async function MovieIdPage({
    params,
    }: {
    params: { movieId: string };
    }) {
    const movieFilm = await getMovieById(params.movieId);
        const popularMovie = await getPopularMovieById(params.movieId);
        if (!movieFilm) {
            return <div>Película no encontrada</div>;
        }

    if (!movieFilm && !popularMovie) {
        redirect("/streaming");
    }

    const currentMovie = movieFilm
        ? movieFilm.url_video
        : popularMovie
        ? popularMovie.url_video
        : "";

    const titleMovie = movieFilm
        ? movieFilm.titulo
        : popularMovie
        ? popularMovie.titulo
        : "";

    return (
        <div className="h-screen w-full bg-black">
        <NavbarFilm titleMovie={titleMovie} />
        <MovieVideo currentMovie={currentMovie} />
        </div>
    );
}