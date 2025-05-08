import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productos from "@/data/examples/productos-promociones";
import React from "react";
import TarjetaProducto from "./producto";

function CarruselDeProductos() {
  return (
    <Carousel>
      <CarouselContent className="ml-1 flex w-full flex-row gap-4">
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
