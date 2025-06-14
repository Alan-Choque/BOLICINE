import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ActionsButtons } from "./ActionsButtons";
import { ChaptersInfo } from "./ChaptersInfo";
import { CarouselMovieProps } from "./CarouselMovie.types";
import { FilmGenres } from "./FilmGenres";

export function CarouselMovie(props: CarouselMovieProps) {
    const { movies, isMyList } = props;

    return (
        <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4"> {/* Usando el -ml-4 por defecto de shadcn */}
                {movies.map((movie) => (
                    // 1. Contenedor principal del item
                    <CarouselItem
                        key={movie.id_pelicula}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4 group" // Añadido 'group' aquí
                    >
                        {/* 2. La tarjeta flotante (hover) y la estática están en el mismo nivel */}
                        <div className="relative"> {/* Contenedor relativo para posicionar la tarjeta flotante */}
                            
                            {/* Tarjeta Estática (lo que se ve por defecto) */}
                            <Card className="rounded-md overflow-hidden">
                                <CardContent className="p-0 aspect-video">
                                    <Image
                                        src={movie.imagen_portada ? movie.imagen_portada.trimEnd() : '/path/to/default.png'}
                                        alt={movie.titulo}
                                        layout="fill"
                                        className="object-fit"
                                    />
                                </CardContent>
                            </Card>

                            {/* 3. ✨ Tarjeta Flotante (la magia del hover) ✨ */}
                            <div className="
                                absolute top-0 left-0 w-full h-auto 
                                opacity-0 invisible group-hover:visible group-hover:opacity-100 
                                transition-all duration-300 ease-in-out
                                transform origin-center 
                                group-hover:scale-125 group-hover:-translate-y-[15%]
                                z-50 rounded-lg overflow-hidden shadow-2xl bg-zinc-900
                            ">
                                {/* Adelanto de Video */}
                                <div className="aspect-video w-full">
                                    <video
                                        src={movie.url_video} // Asegúrate de tener una URL del trailer
                                        poster={movie.imagen_portada ? movie.imagen_portada.trimEnd() : '/path/to/default.png'}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline // Importante para móviles
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Contenido inferior con botones y info */}
                                <div className="p-3">
                                    <ActionsButtons
                                        movieId={movie.id_pelicula}
                                        movie={movie}
                                        isMyList={isMyList}
                                    />
                                    <ChaptersInfo age={movie.age} duration={movie.duracion} />
                                    <FilmGenres genres={movie.genres} />
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" /> {/* Ajuste para que no se superponga con el padding */}
            <CarouselNext className="mr-14" /> {/* Ajuste para que no se superponga con el padding */}
        </Carousel>
    );
}