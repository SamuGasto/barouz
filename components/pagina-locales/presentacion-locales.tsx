import React from "react";
import MapaGoogle from "./mapa";
import Locales from "./locales";
import { obtenerLocales } from "@/utils/querys/cliente/obtener-locales";

async function PresentacionLocales() {
  const locales = await obtenerLocales();

  return (
    <div className="flex w-full flex-col justify-center gap-6 py-10 md:flex-row">
      <Locales locales={locales} />
      <MapaGoogle locales={locales} />
    </div>
  );
}

export default PresentacionLocales;
