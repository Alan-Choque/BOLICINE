import CandyAnuncio from "../components/CandyAnuncios";
import CarruselCandy from "../components/candyCarousel";
export default function CandyPage() {
  return (
    <div className="py-4">
      <div className="justify-center m-5 bg-red-500 rounded-2xl px-5">
        <CandyAnuncio />
      </div>
      <div className="mx-5">
        <h1 className="text-2xl font-bold text-black">
          Productos recomandados
        </h1>
        <CarruselCandy />
      </div>
      <div className="mx-5">
        <h1 className="text-2xl font-bold text-black">
          Otras opciones
        </h1>
        <CarruselCandy />
      </div>
    </div>
  );
}
