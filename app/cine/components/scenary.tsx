"use client";
import { useState } from "react";
import SeatSelector from "./seat";

export default function SeleccionAsientosPage() {
   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const handleSeats = (selected: string[]) => {
      setSelectedSeats(selected);
  };
     const total = selectedSeats.length * 29.99;
  return (
    <div className="p-6">
      <SeatSelector
        rows={8}
        cols={10}
        reservedSeats={["A1", "B3", "C5"]}
        onSelectionChange={handleSeats}
      />
   <div className="flex justify-center mt-4">
  <div className="bg-red-600 text-white text-lg font-semibold px-4 py-2 rounded-full shadow">
    Total: Bs. {total}
  </div>
</div>
<div className="flex justify-center mt-3">
  <div className="text-center text-gray-800">
    {selectedSeats.length > 0 ? (
      <p>
        Numero de boletos:{" "}
        <span className="font-semibold text-black">
          {selectedSeats.join(", ")}
        </span>
      </p>
    ) : (
      <p>No has seleccionado ningún asiento.</p>
    )}
  </div>
</div>
</div>


    
  );
}
