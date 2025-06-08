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
import Link from "next/link";

const moviePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="text-black py-15">
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
        <Button asChild className="bg-red-500"><Link href="/cine/pagos">Continuar</Link></Button>
      </div>
    </div>
  );
};

export default moviePage;
