import React from "react";

import { obtenerCarruselOfertas } from "@/utils/querys/servidor/carruseles";
import CarruselOfertas from "../general/carrusel-ofertas";

async function CarruselPromociones() {
  const ofertas = await obtenerCarruselOfertas();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full rounded-xl p-4 md:w-2/4 md:p-0">
        <CarruselOfertas ofertas={ofertas ? ofertas : []} />
      </div>
    </div>
  );
}

export default CarruselPromociones;
