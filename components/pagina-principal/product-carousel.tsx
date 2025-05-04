import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

import { Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import products from "@/data/examples/ofertas-carousel";

function ProductCarousel() {
  return (
    <div className="w-full max-w-5xl rounded-xl p-4 md:w-3/4 md:p-0 md:shadow-lg dark:shadow-none">
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div>
                <Card className="aspect-video">
                  <CardContent className="relative -m-4">
                    <Image
                      className="aspect-video rounded-lg"
                      src={product.image}
                      alt={product.oferta_texto}
                    />
                    <div className="absolute top-0 flex h-full w-fit flex-col justify-center gap-2 rounded-lg bg-linear-to-r/srgb from-black/50 to-transparent p-4">
                      <Badge className="bg-brand-state-1 text-brand-state-1-foreground hover:bg-brand-state-1 w-fit text-xs">
                        Oferta por tiempo limitado
                      </Badge>
                      <h2 className="text-primary-foreground dark:text-primary text-md font-bold md:text-5xl">
                        {product.oferta_texto}
                      </h2>
                      <div className="dark:text-primary flex flex-row items-center gap-2">
                        <Clock className="text-primary-foreground dark:text-primary size-4 md:size-6" />
                        <p className="text-primary-foreground dark:text-primary text-sm font-light md:text-2xl">
                          Valido hasta el{" "}
                          <span className="font-bold">
                            {product.oferta_termino}
                          </span>
                        </p>
                      </div>
                      <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 w-fit">
                        Ordenar Ahora
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
