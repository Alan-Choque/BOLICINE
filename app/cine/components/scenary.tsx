"use client";
import SeatSelector from "./seat";

export default function SeleccionAsientosPage() {
  const handleSeats = (selected: string[]) => {
    console.log("Asientos seleccionados:", selected);
  };

  return (
    <div className="p-6">
      <SeatSelector
        rows={8}
        cols={10}
        reservedSeats={["A1", "B3", "C5"]}
        onSelectionChange={handleSeats}
      />
    </div>
  );
}
