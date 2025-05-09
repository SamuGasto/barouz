"use client";
import todosLosProductos from "@/data/examples/todos-productos";
import React from "react";
import TarjetaProducto from "../pagina-menu/producto";
import { useFiltrosStore } from "@/components/providers/filtros-provider";

const nombresFiltros = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffles Cookies",
  "Postres",
  "Bebidas",
];

function MenuFiltrado() {
  const filtros_categoria = useFiltrosStore((state) => state.filtro_categoria);

  if (filtros_categoria.every((item) => item == 0)) return <div></div>;

  return (
    <div className="flex w-full flex-wrap justify-center gap-1 p-2 md:gap-4 md:p-4 lg:p-6">
      {todosLosProductos
        .filter(
          (item) =>
            filtros_categoria[nombresFiltros.indexOf(item.categoria)] == 1,
        )
        .map((item) => (
          <TarjetaProducto key={item.id} producto={item} />
        ))}
    </div>
  );
}

export default MenuFiltrado;
