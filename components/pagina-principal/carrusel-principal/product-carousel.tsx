import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { obtenerCarruselPrincipal } from "@/utils/querys/servidor/carruseles";
import TarjetaCarrusel from "./tarjeta-carrusel";
import { Oferta } from "@/data/tipos";

async function ProductCarousel() {
  const ofertas = await obtenerCarruselPrincipal();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full rounded-xl p-4 md:w-3/4 md:p-0">
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
      </div>
    </div>
  );
}

export default ProductCarousel;
