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
    id: 15,
    title: "The thunderbolts",
    description: "Description for Movie 1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 21,
    title: "Lilo and stich",
    description: "Description for Movie 2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 25,
    title: "Destino final",
    description: "Description for Movie 3",
    imageUrl: "https://via.placeholder.com/150",
  },
];
const CarruselPeliculas = () => {
  return (
    <>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="flex space-x-2">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  description={movie.description}
                  imageUrl={movie.imageUrl}
                  href={`/cine/movies/${movie.id}`}
                ></MovieCard>
              ))}
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default CarruselPeliculas;
