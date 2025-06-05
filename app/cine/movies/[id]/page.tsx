import React from "react";
import SeleccionAsientosPage from "../../components/scenary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="justify-center items-center flex flex-col mt-4">
        <h1>Escenario</h1>
        <SeleccionAsientosPage />
      </div>
    </div>
  );
};

export default moviePage;
