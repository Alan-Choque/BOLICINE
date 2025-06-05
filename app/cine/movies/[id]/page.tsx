import React from "react";
import SeleccionAsientosPage from "../../components/scenary";

const moviePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="text-black">
      moviePage: {id}
      <div className="mt-4">
        <img
          src={`https://via.placeholder.com/150?text=Movie+${id}`}
          alt={`Movie ${id}`}
          className="rounded-lg"
        />
      </div>
      <div className="justify-center items-center flex flex-col mt-4">
        <h1>Escenario</h1>
        <SeleccionAsientosPage />
      </div>
    </div>
  );
};

export default moviePage;
