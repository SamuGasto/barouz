import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CuponCarrusel from "../pagina-principal/carrusel-principal/cupon-carrusel";
import { CuponRow } from "@/types/resumen-tipos";

interface PropType {
  cupones: CuponRow[];
}

function CarruselOfertas({ cupones }: PropType) {
  return (
    <Carousel>
      <CarouselContent>
        {cupones?.map((cupon: CuponRow) => (
          <CarouselItem key={cupon.id}>
            <CuponCarrusel cupon={cupon} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:block" />
      <CarouselNext className="hidden md:block" />
    </Carousel>
  );
}

export default CarruselOfertas;
