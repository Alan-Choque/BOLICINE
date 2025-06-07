// import Image from "next/image";
// import Navbar from "./components/navbar";
import RatedCard from "./components/ratedCard";
import CarruselAdds from "./components/addsCarousel";
import CarruselPeliculas from "./components/movieCarousel";

export default function Home() {
  return (
    <div>
      <div className="text-black">
        <div className="py-15">
          <RatedCard />
        </div>
        <div className="px-5">
          <CarruselAdds />
        </div>
        <div className="py-6 px-5">
          <h1 className="text-2xl font-bold mb-4">Estrenos</h1>
          <CarruselPeliculas />
        </div>
        <div className="py-6 px-5">
          <CarruselAdds />
        </div>
        <div className="py-6 px-5">
          <h1 className="text-2xl font-bold mb-4">Todas las peliculas</h1>
          <CarruselPeliculas />
        </div>
      </div>
    </div>
  );
}
