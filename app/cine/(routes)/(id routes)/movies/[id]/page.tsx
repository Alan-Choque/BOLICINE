import React from "react";
import SeleccionAsientosPage from "@/app/cine/components/scenary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Details from "@/app/cine/components/details";
import { Button } from "@/components/ui/button";

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
      <div className="px-10 py-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Detalles de la película</AccordionTrigger>
            <AccordionContent>
              <Details />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="justify-center items-center flex flex-col mt-4">
        <h1>Escenario</h1>
        <SeleccionAsientosPage />
      </div>
      <div className="flex justify-center items-center m-4">
        <Button>Reservar</Button>
      </div>
    </div>
  );
};

export default moviePage;
