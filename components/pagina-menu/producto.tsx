import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Producto } from "@/data/examples/productos-promociones";

function TarjetaProducto({ producto }: { producto: Producto }) {
  return (
    <Card
      key={producto.id}
      className="w-fit max-w-[170px] shadow-none transition-all hover:scale-102 md:max-w-[300px]"
    >
      <CardContent className="-m-3 flex flex-col gap-2">
        <div
          id="informacion"
          className="flex max-w-[180px] flex-col items-center gap-2"
        >
          <Image
            id="imagen-producto"
            className="h-[200px] rounded-md object-cover"
            src={producto.imagen}
            alt={producto.nombre}
          />
          <div id="descripcion" className="flex w-full flex-col text-left">
            <div className="flex w-full flex-row justify-between">
              <h3 className="truncate text-lg font-semibold">
                {producto.nombre}
              </h3>
              <p className="text-brand-primary font-semibold">
                $
                {producto.precio
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <p className="truncate text-sm font-light">
              {producto.descripcion}
            </p>
          </div>
        </div>
        <Button
          id="agregar-al-carrito"
          className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 flex w-full items-center justify-center gap-2"
        >
          <CirclePlus className="hidden md:block" />
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
}

export default TarjetaProducto;
