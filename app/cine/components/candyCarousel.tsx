"use client";
import React from "react";
import CandyCard from "./candyCard";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
const candys = [
  {
    id: 3,
    title: "Salchipapa",
    description: "Description for candy1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Big hooper",
    description: "Description for candy2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 19,
    title: "Hamburguesa con queso",
    description: "Description for candy3",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const CarruselCandy = () => {
  return (
    <div className="py-4">
      <Carousel>
        <CarouselContent>
          <div className="flex space-x-4">
            {candys.map((candys) => (
              <CandyCard
                key={candys.id}
                title={candys.title}
                description={candys.description}
                imageUrl={candys.imageUrl}
                href={`/cine/candys/${candys.id}`}
              ></CandyCard>
            ))}
          </div>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarruselCandy;
