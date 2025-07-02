
import React from "react";
import CarruselOfertas from "@/components/general/carrusel-ofertas";
import { Oferta } from "@/data/tipos";

async function ProductCarousel() {
  const ofertas: Oferta[] = [];
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full rounded-xl p-4 md:w-2/4 md:p-0">
        <CarruselOfertas ofertas={ofertas} />
      </div>
    </div>
  );
}

export default ProductCarousel;
