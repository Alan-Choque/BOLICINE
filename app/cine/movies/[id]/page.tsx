import CandyCard from "../../components/candyCard";
import movies from "../../components/movieCarousel";
import React from "react";

const moviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      moviePage: {id}
      <div className="mt-4">
        <img
          src={`https://via.placeholder.com/150?text=Movie+${id}`}
          alt={`Movie ${id}`}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default moviePage;
