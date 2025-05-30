// Import the necessary modules from React and Next.js
import React from "react";
import MovieCard from "./components/card";
import CarruselEstrenos from "./components/carruselEstrenos";
import CarruselPeliculas from "./components/carruselPeliculas";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <MovieCard />
      <CarruselEstrenos />
      <CarruselPeliculas />
    </div>
  );
}
