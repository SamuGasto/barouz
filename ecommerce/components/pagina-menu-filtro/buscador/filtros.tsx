"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useFiltrosStore } from "@/components/providers/filtros-provider";
import { CategoriaProductos } from "@/types/resumen-tipos";

const nombresFiltros: CategoriaProductos[] = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffle Cookies",
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
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4">
      <p className="text-2xl font-thin">Categorías: </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {nombresFiltros.map((nombre, index) => {
          return (
            <Badge
              key={index}
              className="cursor-pointer"
              variant={filtrosCategoria.includes(nombre) ? "default" : "secondary"}
              onClick={() => {
                const nuevoEstado = [...filtrosCategoria];
                if (filtrosCategoria.includes(nombre)) {
                  nuevoEstado.splice(filtrosCategoria.indexOf(nombre), 1);
                } else {
                  nuevoEstado.push(nombre);
                }
                setFiltrosCategoria(nuevoEstado);
              }}
            >
              {nombre}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default Filtros;
