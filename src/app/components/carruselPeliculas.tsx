import React from "react";

const CarruselPeliculas = () => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Todas las películas</h1>
      <div className="flex overflow-x-auto space-x-4">
        <div className="w-48 h-74 bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-lg">
          Item 1
        </div>
        <div className="w-48 h-74 bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-lg">
          Item 2
        </div>
        <div className="w-48 h-74 bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-lg">
          Item 3
        </div>
        <div className="absolute justify-between mt-34 flex w-full">
          <button className="bg-gray-500 text-white rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <button className="bg-gray-500 text-white rounded-lg hover:bg-blue-600 ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarruselPeliculas;
