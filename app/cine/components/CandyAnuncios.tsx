import React from 'react'
import CandyCard from "./candyCard";
  const candA = [
    {
      id:6,
      title: "NACHOS CON QUESO",
      description: "Clásica o picante.",
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id:1,
      title: "EL CUMPLEAÑERO NO PAGA SU ENTRADA",
      description: "Recibe una entrada totalmente gratis presentando tu carnet.",
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id:17,
      title: "PROMOCIÓN ESPECIAL",
      description: "¡Celebra con nosotros!",
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
        id:5,
      title: "TODOS LOS MIERCOLES 2X1",
      description: "Válido en funciones antes de mediodía.",
      imageUrl: 'https://via.placeholder.com/150'
    },
  ];

  const CandyAnuncio = () => {
  return (
    <div className="py-4">
      <div className="flex overflow-x-auto space-x-4">
        {candA.map((candA) => (
          <CandyCard
            key={candA.id}
            title={candA.title}
            description={candA.description}
            imageUrl={candA.imageUrl}
            href={`/cine/candA/${candA.id}`}>
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

export default CandyAnuncio;
