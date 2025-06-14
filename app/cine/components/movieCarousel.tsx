"use client";
import React from "react";
import MovieCard from "./movieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const movies = [
  {
    id: 1,
    title: "Inception",
    description: "A skilled thief enters people's dreams to steal secrets.",
    imageUrl: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v10_ae.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "Batman faces the Joker in a fight for Gotham's soul.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 4,
    title: "Titanic",
    description: "A romance blossoms on the ill-fated RMS Titanic.",
    imageUrl:
      "https://m.media-amazon.com/images/I/71svirLP6GL._AC_UF894,1000_QL80_DpWeblab_.jpg",
  },
  {
    id: 5,
    title: "Avatar",
    description: "A paraplegic Marine becomes part of an alien world.",
    imageUrl:
      "https://m.media-amazon.com/images/I/51IT55UhhLL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 6,
    title: "The Matrix",
    description: "A hacker discovers the truth about his reality.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/ca/7/7a/Matrix.jpg",
  },
  {
    id: 7,
    title: "Pulp Fiction",
    description: "Stories of crime unfold in Tarantino's cult classic.",
    imageUrl:
      "https://static.posters.cz/image/750/1288.jpg",
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    description: "A hobbit must destroy a powerful ring to save Middle-earth.",
    imageUrl:
      "https://m.media-amazon.com/images/I/71TZ8BmoZqL.jpg",
  },
  {
    id: 9,
    title: "Forrest Gump",
    description: "A simple man witnesses and shapes historical events.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
  },
  {
    id: 10,
  title: "Destino final",
  description: "Description for Movie 3",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLQDApSHnbeOpFQvWxaY47k0rI3DLr1F4Fg&s",
  },
];
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const CarruselPeliculas = () => {
  const shuffledMovies = shuffleArray(movies);
  return (
    <>
      <Carousel>
        <CarouselContent>
            {shuffledMovies.map((movie) => (
              <CarouselItem className="lg:basis-1/7">
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  description={movie.description}
                  imageUrl={movie.imageUrl}
                  href={`/cine/movies/${movie.id}`}
                ></MovieCard>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarruselPeliculas;
