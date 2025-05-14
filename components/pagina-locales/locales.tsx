import React from "react";
import TarjetaLocal from "./tarjeta-local";
import { Local } from "@/data/tipos";

interface PropType {
  locales: Local[];
}

function Locales(props: PropType) {
  return (
    <div className="items-left flex w-1/3 flex-col gap-6">
      <h2 className="text-4xl font-thin">Locales Disponibles</h2>
      {props.locales.map((local) => (
        <TarjetaLocal key={local.id} local={local} />
      ))}
    </div>
  );
}

export default Locales;
