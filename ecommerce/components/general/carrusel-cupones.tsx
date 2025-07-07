"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CuponCarrusel from "../pagina-principal/carrusel-principal/cupon-carrusel";
import { useCupones } from "@/hooks/useCupones";

function CarruselCupones() {
  const { data: cupones } = useCupones();
  return (
    <Carousel>
      <CarouselContent>
        {cupones?.map((cupon) => (
          <CarouselItem key={cupon.id}>
            <CuponCarrusel cupon={cupon} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarruselCupones;
