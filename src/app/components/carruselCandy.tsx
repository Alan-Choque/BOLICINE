import React from "react";
import ProductCard from "./candyCard";

const CarruselCandy = () => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Productos Recomendados</h1>
      <ProductCard></ProductCard>
      <div className="absolute justify-between flex w-full">
          <button className="bg-pink-500 text-white rounded-lg hover:bg-pink-600">
            Previous
          </button>
          <button className="bg-pink-500 text-white rounded-lg hover:bg-pink-600 ml-2">
            Next
          </button>
        </div>
    </div>
  );
};

export default CarruselCandy;
