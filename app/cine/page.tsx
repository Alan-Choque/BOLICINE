import Image from "next/image";
import Navbar from "./components/navbar";
import RatedCard from "./components/ratedCard";
import CarruselAdds from "./components/addsCarousel";
import CarruselPeliculas from "./components/movieCarousel";

export default function Home() {
  return (
    <div>
      <Navbar />
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
      <div  className="py-6">
        <h1 className="text-2xl font-bold mb-4 px-4">Todas las peliculas</h1>
        <CarruselPeliculas />
      </div>
    </div>
    </div>
  );
}
