import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import TarjetaProducto from "./producto";
import { Producto } from "@/data/examples/productos-promociones";

function CarruselDeProductos({ productos }: { productos: Producto[] }) {
  return (
    <Carousel className="w-full max-w-7xl">
      <CarouselContent className="ml-1 flex w-full flex-row gap-1 md:gap-4">
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarruselDeProductos;
