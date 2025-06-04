import React from "react";
import CandyCard from "./candyCard";
const candys =[
  {
    id: 3,
    title: 'Salchipapa',
    description: 'Description for candy1',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    title: 'Big hooper',
    description: 'Description for candy2',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 19,
    title: 'Hamburguesa con queso',
    description: 'Description for candy3',
    imageUrl: 'https://via.placeholder.com/150'
  }
]

const CarruselCandy = () => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Productos Recomendados</h1>
      <div className="flex overflow-x-auto space-x-4">
        {candys.map((candys) => (
          <CandyCard
            key={candys.id}
            title={candys.title}
            description={candys.description}
            imageUrl={candys.imageUrl}
            href={`/candys/${candys.id}`}>
          </CandyCard>
        ))}
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

export default CarruselCandy;
