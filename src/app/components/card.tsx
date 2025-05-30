import React from "react";

const MovieCard = () => {
  return (
    <div>
      <div className="">
        <div className="flex">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLQDApSHnbeOpFQvWxaY47k0rI3DLr1F4Fg&s"
            alt="Movie Poster"
            className="w-full h-88 object-cover blur-xs"
          />
          <div className="absolute px-16 py-22 w-full flex">
            <img
              src="https://www.ecartelera.com/images/img/233200/233294_destino-final-6-lazos-de-sangre-lanza-su-primer.jpg"
              alt="Movie Poster"
              className="w-34 h-48 object-cover"
            />
            <div className="py-8 px-8">
              <h2 className="text-white text-2xl">Destacada de la semana</h2>
              <h2 className="text-red-500 text-3xl mt-1">Destino final</h2>
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

export default MovieCard;
