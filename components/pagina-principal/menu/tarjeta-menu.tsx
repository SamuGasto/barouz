import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import React from "react";

function TarjetaMenu({
  nombre,
  imagen,
  color,
}: {
  nombre: string;
  imagen: StaticImageData;
  color: number;
}) {
  return (
    <AspectRatio ratio={21 / 5}>
      <Card
        className={
          "flex h-full w-full flex-row items-center justify-between gap-2 px-2 py-2 transition-all hover:scale-102 hover:cursor-pointer" +
          ` bg-brand-background-${color.toString()}`
        }
      >
        <h3 className="flex pl-4 text-2xl font-semibold">{nombre}</h3>
        <Image
          src={imagen}
          alt={nombre}
          className="flex h-full w-full max-w-60 rounded-md object-cover"
        />
      </Card>
    </AspectRatio>
  );
}

export default TarjetaMenu;
