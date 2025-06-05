import React from "react";
import AddsCard from "./addsCard";
const adds = [
  {
    id: 39,
    title: "Promo1",
    description: "Description for promo1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 79,
    title: "Promo2",
    description: "Description for promo2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 29,
    title: "Promo3",
    description: "Description for promo3",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const CarruselAdds = () => {
  return (
    <div className="py-4">
      <div className="flex overflow-x-auto space-x-4">
        {adds.map((adds) => (
          <AddsCard
            key={adds.id}
            title={adds.title}
            description={adds.description}
            imageUrl={adds.imageUrl}
            href={`/cine/adds/${adds.id}`}
          ></AddsCard>
        ))}
      </div>
    </div>
  );
};

export default CarruselAdds;
