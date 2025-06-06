"use client";
import React from "react";
import AddsCard from "./addsCard";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const adds = [
  {
    id: 6,
    title: "NACHOS CON QUESO",
    description: "Clásica o picante.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "EL CUMPLEAÑERO NO PAGA SU ENTRADA",
    description: "Recibe una entrada totalmente gratis presentando tu carnet.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 17,
    title: "PROMOCIÓN ESPECIAL",
    description: "¡Celebra con nosotros!",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "TODOS LOS MIERCOLES 2X1",
    description: "Válido en funciones antes de mediodía.",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const CandyAnuncio = () => {
  return (
    <div className="py-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {adds.map((adds) => (
            <AddsCard
              key={adds.id}
              title={adds.title}
              description={adds.description}
              imageUrl={adds.imageUrl}
              href={`/cine/adds/${adds.id}`}
            ></AddsCard>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CandyAnuncio;
