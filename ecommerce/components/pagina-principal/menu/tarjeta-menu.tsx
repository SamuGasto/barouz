import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

const colores: { [key: number]: string } = {
  1: "bg-brand-background-1",
  2: "bg-brand-background-2",
  3: "bg-brand-background-3",
  4: "bg-brand-background-4",
  5: "bg-brand-background-5",
  6: "bg-brand-background-6",
};

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
    <Link
      href={`/menu#${nombre}`}
      className="flex max-w-[600px] items-center justify-center"
    >
      <Card
        className={
          "flex h-fit w-full flex-row items-center justify-between gap-2 px-2 py-2 transition-all hover:scale-102 hover:cursor-pointer " +
          colores[color]
        }
      >
        <h3 className="flex pl-4 text-2xl font-semibold">{nombre}</h3>
        <Image
          src={imagen}
          alt={nombre}
          className="flex h-[100px] w-full max-w-60 rounded-md object-cover"
        />
      </Card>
    </Link>
  );
}

export default TarjetaMenu;
