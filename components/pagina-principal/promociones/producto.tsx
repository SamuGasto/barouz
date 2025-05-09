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
      className="shadow-none transition-all hover:scale-102"
    >
      <CardContent className="-m-3 flex max-w-72 flex-col items-center justify-center gap-2">
        <Image
          className="h-[300px] max-w-60 rounded-md object-cover"
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
        <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 flex w-full items-center justify-center gap-2">
          <CirclePlus />
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
}

export default TarjetaProducto;
