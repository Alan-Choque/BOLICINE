import { MovieCard } from "@/components/Shared/MovieCard";
import { PeliculasGridProps } from "./PeliculasGrid.types";

export function PeliculasGrid(props: PeliculasGridProps) {
    const { peliculas } = props;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {peliculas.map((pelicula) => (
                <MovieCard key={pelicula.id_pelicula} movie={pelicula} />
            ))}
        </div>
    );
}