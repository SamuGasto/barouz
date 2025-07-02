import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import TarjetaProducto from "./producto";
import { ProductoRow } from "@/types/resumen-tipos";

interface PropType {
  productos: ProductoRow[];
}

function CarruselDeProductos(props: PropType) {
  const { productos } = props;
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
