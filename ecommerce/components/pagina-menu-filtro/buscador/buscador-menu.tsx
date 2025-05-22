import React from "react";
import InputBusqueda from "./input-busqueda";
import Filtros from "./filtros";

function BuscadorMenu() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-6">
      <InputBusqueda />
      <Filtros />
    </div>
  );
}

export default BuscadorMenu;
