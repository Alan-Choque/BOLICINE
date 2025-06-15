import { MovieCard } from "@/components/Shared/MovieCard";
import { TrendingGridProps } from "./TrendingGrid.types";

export function TrendingGrid(props: TrendingGridProps) {
    const { trendingContent } = props;
    
    // Podrías añadir un badge de ranking si quisieras
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingContent.map((content) => (
                <MovieCard key={content.id_pelicula} movie={content} />
            ))}
        </div>
    );
}