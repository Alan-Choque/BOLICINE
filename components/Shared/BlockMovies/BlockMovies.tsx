import { BlockMoviesProps } from "./BlockMovies.types";
import { CarouselMovie } from "./CarouselMovie";

export function BlockMovies(props: BlockMoviesProps) {
    const { title, movies, isMyList } = props;

    if (!movies || movies.length === 0) return null;

    return (
        <div className="px-[4%] pt-6 pb-10 md:pt-8 md:pb-1 bg-[#171717]"> {/* OJO: He simplificado y movido el padding aquí */}
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{title}</h3>
            <CarouselMovie movies={movies} isMyList={isMyList} />
        </div>
    );
}