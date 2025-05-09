import React from "react";
import CarruselDeProductos from "../carrusel-de-productos";
import productos from "@/data/examples/productos-promociones";

function Populares() {
  return (
    <div className="bg-brand-background-7 items-left justify-left flex w-full flex-col gap-0 p-8">
      <div className="items-left justify-left flex flex-col gap-2">
        <h2 className="text-4xl font-thin">Populares</h2>
      </div>
      <div className="w-full rounded-xl p-4 md:ml-10 md:w-11/12 md:p-0 dark:shadow-none">
        <CarruselDeProductos productos={productos} />
      </div>
    </div>
  );
}

export default Populares;
