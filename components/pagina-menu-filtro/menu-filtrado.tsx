"use client";
import React from "react";
import TarjetaProducto from "../pagina-menu/producto";
import { useFiltrosStore } from "@/components/providers/filtros-provider";
import obtenerTodosLosProductos from "@/utils/querys/cliente/todos-productos";
import { Producto } from "@/data/tipos";

const nombresFiltros = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffles Cookies",
  "Postres",
  "Bebidas",
];

function MenuFiltrado() {
  const filtrosCategoria = useFiltrosStore((state) => state.filtro_categoria);
  const filtrosTexto = useFiltrosStore((state) => state.filtro_texto);
  const [productos, setProductos] = React.useState<Producto[]>([]);

  React.useEffect(() => {
    obtenerTodosLosProductos().then((productos) => {
      const productosFiltrados = productos
        .filter((producto) => {
          if (filtrosCategoria.every((item) => item == 0)) return true;
          return (
            filtrosCategoria[nombresFiltros.indexOf(producto.categoria)] == 1
          );
        })
        .filter((producto) => {
          if (filtrosTexto == "") return true;
          return (
            producto.nombre
              .toLowerCase()
              .includes(filtrosTexto.toLowerCase()) ||
            producto.descripcion
              .toLowerCase()
              .includes(filtrosTexto.toLowerCase())
          );
        });
      setProductos(productosFiltrados);
    });
  }, [filtrosCategoria, filtrosTexto]);

  if (productos.length == 0)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 p-10">
        <p className="text-center text-4xl font-thin">
          No se encontraron productos
        </p>
        <p className="text-brand-primary text-7xl font-semibold">{":("}</p>
        <p className="text-center text-2xl font-thin">
          Intenta con alguno de los otros filtros...
        </p>
      </div>
    );

  return (
    <div className="flex w-full flex-wrap justify-center gap-1 px-2 py-12 md:gap-4 md:px-4 lg:px-6">
      {productos.map((item) => (
        <TarjetaProducto key={item.id} producto={item} />
      ))}
    </div>
  );
}

export default MenuFiltrado;
