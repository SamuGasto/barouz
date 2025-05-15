import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Producto } from "@/data/tipos";
import DialogAnadirProducto from "@/components/general/dialog-anadir-producto";

function TarjetaProducto({ producto }: { producto: Producto }) {
  return (
    <Card
      key={producto.id}
      className="w-[240px] px-0 py-0 shadow-none transition-all hover:scale-102"
    >
      <CardContent className="flex max-w-72 flex-col items-center justify-center gap-2 p-2">
        <Image
          className="h-[300px] rounded-md object-cover"
          src={producto.imagen}
          alt={producto.nombre}
        />
        <div className="flex w-full flex-col text-left">
          <div className="flex w-full flex-row justify-between">
            <h3 className="truncate text-lg font-semibold">
              {producto.nombre}
            </h3>
            <p className="text-brand-primary font-semibold">
              $
              {producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
          </div>
          <p className="text-md truncate font-thin">{producto.descripcion}</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <DialogAnadirProducto producto={producto} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TarjetaProducto;
