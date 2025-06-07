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

// TarjetaMenu debe permanecer como Server Component para SEO y performance.
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
      aria-label={`Ver categoría de menú ${nombre}`}
      className="flex max-w-[600px] items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
    >
      <Card
        className={
          "flex h-fit w-full flex-row items-center justify-between gap-2 px-3 py-3 md:px-2 md:py-2 transition-all duration-200 ease-in-out hover:shadow-xl hover:cursor-pointer focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 " +
          colores[color]
        }
      >
        <h3 className="flex pl-4 font-semibold text-brand-primary drop-shadow-sm md:text-2xl text-lg" style={{ color: 'hsl(var(--brand-primary-foreground))' }}>
          {nombre}
        </h3>
        <Image
          src={imagen}
          alt={nombre}
          className="flex h-[100px] w-full max-w-60 rounded-md object-cover shadow-md"
        />
      </Card>
    </Link>
  );
}

export default TarjetaMenu;
