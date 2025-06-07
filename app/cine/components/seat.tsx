"use client";

import { useState } from "react";
import classNames from "classnames";

interface SeatSelectorProps {
  rows: number;
  cols: number;
  reservedSeats?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

export default function SeatSelector({
  rows,
  cols,
  reservedSeats = [],
  onSelectionChange,
}: SeatSelectorProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    if (reservedSeats.includes(seatId)) return;

    const updatedSelection = selectedSeats.includes(seatId)
      ? selectedSeats.filter((s) => s !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updatedSelection);
    onSelectionChange?.(updatedSelection);
  };

  const generateSeatId = (row: number, col: number) =>
    String.fromCharCode(65 + row) + (col + 1);

  return (
    <div className="grid gap-2">
      {[...Array(rows)].map((_, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-2">
          {[...Array(cols)].map((_, colIdx) => {
            const seatId = generateSeatId(rowIdx, colIdx);
            const isReserved = reservedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                disabled={isReserved}
                className={classNames(
                  "w-8 h-8 rounded",
                  isReserved && "bg-gray-500 cursor-not-allowed",
                  !isReserved &&
                    (isSelected
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 hover:bg-red-300")
                )}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
