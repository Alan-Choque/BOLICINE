import CandyAnuncio from "../components/CandyAnuncios"
import CarruselCandy from "../components/candyCarousel";
export default function CandyPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text black">Candy Bar</h1>
      <CandyAnuncio />
      <CarruselCandy />
       

    </div>
  );
}
