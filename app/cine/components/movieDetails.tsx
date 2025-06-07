"use client";
import React from "react";
interface MovieDetailsProps {
  trailerUrl: string; // La URL para el trailer
  titleOriginal: string; // El título original
  classification: string; // La clasificación
  genre: string; // El género
  director: string; // El director
  actors: string; // Los actores principales
  country: string; // El país de origen
  duration: string; // La duración
  distributor: string; // El distribuidor
  showtimes: string[]; //los horarios
}

const MovieDetails = ({
  trailerUrl,
  titleOriginal,
  classification,
  genre,
  director,
  actors,
  country,
  duration,
  distributor,
  showtimes,
}: MovieDetailsProps) => {
  return (
    <div>
      <div className="objetc-cover">
        {trailerUrl && (
          <div>
            <iframe
              width="100%"
              height="350"
              src={trailerUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer de la película"
            ></iframe>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h1>{titleOriginal || "Título de la Película"}</h1>
        <p>
          Acosado por una violenta pesadilla recurrente, el estudiante
          universitario Skye debe ir a casa con una localización. Es una persona
          que puede ver a los demás antes de su muerte y su destino es la
          espeluznante muerte que inevitablemente les espera a todos.
        </p>
        <div className="space-y-4">
          <div>
            <p>TÍTULO ORIGINAL:</p>
            <p>{titleOriginal || "N/A"}</p> {}
          </div>
          <div>
            <p>CLASIFICACIÓN:</p>
            <p>{classification || "N/A"}</p>
          </div>
          <div>
            <p>GÉNERO:</p>
            <p>{genre || "N/A"}</p>
          </div>
          <div>
            <p>DIRECTOR:</p>
            <p>{director || "N/A"}</p>
          </div>
          <div>
            <p>ACTORES:</p>
            <p>{actors || "N/A"}</p>
          </div>
          <div>
            <p>PAÍS:</p>
            <p>{country || "N/A"}</p>
          </div>
          <div>
            <p>DURACIÓN:</p>
            <p>{duration || "N/A"}</p>
          </div>
          <div>
            <p>DISTRIBUIDOR:</p>
            <p>{distributor || "N/A"}</p>
          </div>
        </div>
        <div>
          <h3>Funciones</h3>
          <div>
            <button>HOY</button>
            <button>Mañana</button>
            <button>Pasado Mañana</button>
          </div>
          <div className="justify-center items-center flex gap-2">
            {showtimes && showtimes.length > 0 ? (
              showtimes.map((time, index) => (
                <button className="p-1 border-red-500 border-2 hover:bg-red-300" key={index}>{time}</button>
              ))
            ) : (
              <p>No hay funciones disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
