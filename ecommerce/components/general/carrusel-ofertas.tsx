import React from "react";
import { Oferta } from "@/data/tipos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import TarjetaCarrusel from "../pagina-principal/carrusel-principal/tarjeta-carrusel";

function CarruselOfertas({ ofertas }: { ofertas: Oferta[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {ofertas?.map((oferta: Oferta) => (
          <CarouselItem key={oferta.id}>
            <TarjetaCarrusel oferta={oferta} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:block" />
      <CarouselNext className="hidden md:block" />
    </Carousel>
  );
}

export default CarruselOfertas;
