import React from "react";
import CarruselDeProductos from "@/components/general/carrusel-de-productos";
import { Producto } from "@/data/tipos";

async function Promociones() {
  const promociones: Producto[] = [];
  return (
    <div className="bg-brand-background-1 flex w-full flex-col items-center justify-center gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl md:text-5xl font-thin">Promociones</h2>
        <p className="text-xl font-thin">
          Nuestros mejores productos a un fantástico precio
        </p>
      </div>
      <div className="w-full max-w-5xl rounded-xl p-4 md:w-3/4 md:p-0 dark:shadow-none">
        {/* <CarruselDeProductos productos={promociones} /> */}
      </div>
      <a className="text-brand-primary font-semibold" href="/promociones">
        Ver todas las promociones
      </a>
    </div>
  );
}

export default Promociones;
