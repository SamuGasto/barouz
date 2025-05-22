import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Oferta } from "@/data/tipos";

function TarjetaCarrusel({ oferta }: { oferta: Oferta }) {
  return (
    <Card className="relative px-2 py-2">
      <Image
        className="h-[460px] rounded-lg object-cover"
        quality={50}
        src={oferta.image}
        alt={oferta.oferta_texto}
        placeholder="blur"
      />
      <div className="absolute top-0 flex h-full w-fit flex-col justify-center gap-2 rounded-lg bg-linear-to-r/srgb from-black/50 to-transparent p-4">
        <Badge className="bg-brand-state-1 text-brand-state-1-foreground hover:bg-brand-state-1 w-fit text-xs">
          Oferta por tiempo limitado
        </Badge>
        <h3 className="text-primary-foreground dark:text-primary text-md font-bold md:text-5xl">
          {oferta.oferta_texto}
        </h3>
        <div className="dark:text-primary flex flex-row items-center gap-2">
          <Clock className="text-primary-foreground dark:text-primary size-4 md:size-6" />
          <p className="text-primary-foreground dark:text-primary text-sm font-light md:text-2xl">
            Valido hasta el{" "}
            <span className="font-bold">{oferta.oferta_termino}</span>
          </p>
        </div>
        <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 w-fit">
          Ordenar Ahora
        </Button>
      </div>
    </Card>
  );
}

export default TarjetaCarrusel;
