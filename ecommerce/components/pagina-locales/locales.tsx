import React from "react";
import TarjetaLocal from "./tarjeta-local";
import { LocalRow } from "@/types/resumen-tipos";

interface PropType {
  locales: LocalRow[];
}

function Locales(props: PropType) {
  return (
    <div className="items-left flex w-full flex-col gap-6 self-start md:w-1/3">
      <h2 className="text-center text-4xl font-thin md:text-left">
        Locales Disponibles
      </h2>
      {props.locales.map((local) => (
        <TarjetaLocal key={local.id} local={local} />
      ))}
    </div>
  );
}

export default Locales;
