import productos from "@/data/examples/productos-promociones";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

function Promociones() {
  return (
    <div className="bg-brand-background-1 flex w-full flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-5xl font-thin">Promociones</h2>
        <p className="text-xl font-thin">
          Nuestros mejores productos a un fantástico precio
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {productos.map((producto) => (
          <Card key={producto.id} className="shadow-none">
            <CardContent className="-m-3 flex flex-col items-center justify-center gap-2">
              <Image
                className="h-[300px] max-w-60 rounded-md object-cover"
                src={producto.imagen}
                alt={producto.nombre}
              />
              <div className="flex w-full flex-col text-left">
                <div className="flex w-full flex-row justify-between">
                  <p className="text-lg font-semibold">{producto.nombre}</p>
                  <p className="text-brand-primary font-semibold">
                    $
                    {producto.precio
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>
                </div>
                <p className="text-md font-thin">{producto.descripcion}</p>
              </div>
              <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 flex w-full items-center justify-center gap-2">
                <CirclePlus />
                Agregar al carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <a className="text-brand-primary font-semibold" href="/promociones">
        Ver todas las promociones
      </a>
    </div>
  );
}

export default Promociones;
