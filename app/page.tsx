import RatedCard from "./cine/components/ratedCard";
import CarruselAdds from "./cine/components/addsCarousel";
import CarruselPeliculas from "./cine/components/movieCarousel";

export default function Home() {
  return (
    <div className="text-black py-15">
      <div>
        <RatedCard />
        <div className="justify-center m-5">
          <CarruselAdds />
        </div>
        <div className="py-6 mx-5">
          <h1 className="text-2xl font-bold mb-4">Estrenos</h1>
          <CarruselPeliculas />
        </div>
        <div className="justify-center m-5">
          <CarruselAdds />
        </div>
        <div className="py-6 mx-5">
          <h1 className="text-2xl font-bold mb-4">Todas las peliculas</h1>
          <CarruselPeliculas />
        </div>
      </div>
    </div>
  );
}
