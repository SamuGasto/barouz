import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Producto } from "@/data/tipos";
import DialogAnadirProducto from "@/components/general/dialog-anadir-producto/dialog-anadir-producto";

function TarjetaProducto({ producto }: { producto: Producto }) {
  return (
    <Card
      key={producto.id}
      className="w-[240px] px-0 py-0 shadow-none transition-all hover:scale-102"
    >
      <CardContent className="flex max-w-72 flex-col items-center justify-center gap-2 px-2 pt-2">
        <Image
          className="h-[260px] rounded-md object-cover"
          quality={100}
          src={producto.imagen}
          alt={producto.nombre}
          placeholder="blur"
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
      </CardContent>
      <CardFooter className="flex w-full items-center justify-center p-2">
        <DialogAnadirProducto producto={producto} />
      </CardFooter>
    </Card>
  );
}

export default TarjetaProducto;
