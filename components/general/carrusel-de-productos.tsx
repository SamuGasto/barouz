import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import TarjetaProducto from "../pagina-principal/promociones/producto";
import { Producto } from "@/data/tipos";

function CarruselDeProductos({ productos }: { productos: Producto[] }) {
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
