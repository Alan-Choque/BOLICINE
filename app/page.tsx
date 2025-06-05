import RatedCard from "./cine/components/ratedCard";
import CarruselAdds from "./cine/components/addsCarousel";
import CarruselPeliculas from "./cine/components/movieCarousel";

export default function Home() {
  return (
    <div>
      <div>
        <RatedCard />
        <div className="py-6">
          <CarruselAdds />
        </div>
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4 px-4">Estrenos</h1>
          <CarruselPeliculas />
        </div>
        <div className="py-6">
          <CarruselAdds />
        </div>
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4 px-4">Todas las peliculas</h1>
          <CarruselPeliculas />
        </div>
      </div>
    </div>
  );
}
