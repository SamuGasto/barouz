"use client";
import React from "react";
import { useFiltrosStore } from "@/components/providers/filtros-provider";
import TarjetaProducto from "../general/producto";
import { useProductos } from "@/hooks/useProductos";
import { Loader2 } from "lucide-react";

function MenuFiltrado() {
  const filtrosCategoria = useFiltrosStore((state) => state.filtro_categoria);
  const filtrosTexto = useFiltrosStore((state) => state.filtro_texto);
  const { data: productos, isLoading } = useProductos()

  const filtrado = productos?.filter((producto) => {
    if (filtrosCategoria.some((item) => item === producto.categoria) || filtrosCategoria.length == 0) return true;
    return false;
  })
    .filter((producto) => {
      if (filtrosTexto == "" || filtrosTexto == undefined || filtrosTexto == null) return true;
      return (
        producto.nombre
          .toLowerCase()
          .includes(filtrosTexto.toLowerCase()) ||
        producto.descripcion
          .toLowerCase()
          .includes(filtrosTexto.toLowerCase())
      );
    });

  if (isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 p-10">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );

  if (productos?.length == 0)
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
      {filtrado?.map((item) => (
        <TarjetaProducto key={item.id} producto={item} />
      ))}
    </div>
  );
}

export default MenuFiltrado;
