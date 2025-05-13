"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useFiltrosStore } from "@/components/providers/filtros-provider";

const nombresFiltros = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffles Cookies",
  "Postres",
  "Bebidas",
  "Otros",
];

function Filtros() {
  const filtrosCategoria = useFiltrosStore((state) => state.filtro_categoria);
  const setFiltrosCategoria = useFiltrosStore(
    (state) => state.setFiltroCategoria,
  );

  return (
    <div className="flex h-fit w-full flex-wrap items-center justify-center gap-4">
      {nombresFiltros.map((nombre, index) => {
        return (
          <Badge
            key={index}
            className="cursor-pointer"
            variant={filtrosCategoria[index] == 0 ? "secondary" : "default"}
            onClick={() => {
              const nuevoEstado = [...filtrosCategoria];
              nuevoEstado[index] = nuevoEstado[index] == 0 ? 1 : 0;
              setFiltrosCategoria(nuevoEstado);
            }}
          >
            {nombre}
          </Badge>
        );
      })}
    </div>
  );
}

export default Filtros;
