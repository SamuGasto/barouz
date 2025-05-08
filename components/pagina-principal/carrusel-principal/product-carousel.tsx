import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import products from "@/data/examples/ofertas-carousel";
import TarjetaCarrusel from "./tarjeta-carrusel";

function ProductCarousel() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full rounded-xl p-4 md:w-3/4 md:p-0">
        <Carousel>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <TarjetaCarrusel product={product} />
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
