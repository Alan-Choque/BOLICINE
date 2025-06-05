import React from "react";
import MovieCard from "./movieCard";
const movie = {
  id: 25,
  title: "Destino final",
  description: "Description for Movie 3",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLQDApSHnbeOpFQvWxaY47k0rI3DLr1F4Fg&s",
};

const RatedCard = () => {
  return (
    <div>
      <div className="">
        <div className="flex">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLQDApSHnbeOpFQvWxaY47k0rI3DLr1F4Fg&s"
            alt="Movie Poster"
            className="w-full h-120 object-cover blur-xs brightness-50"
          />
          <div className="absolute flex justify-center items-center w-xl h-4/6 gap-8 md:flex">
            <MovieCard
            key={movie.id}
            title={movie.title}
            description={movie.description}
            imageUrl={movie.imageUrl}
            href={`cine/movies/${movie.id}`}></MovieCard>
            <div className="">
              <h2 className="text-white text-2xl">Destacada de la semana</h2>
              <h2 className="text-red-500 text-3xl mt-1">{movie.title}</h2>
              <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 mt-4">
                Comprar Boletos
              </button>
              <button className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-600 ml-4">
                Ver Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatedCard;
