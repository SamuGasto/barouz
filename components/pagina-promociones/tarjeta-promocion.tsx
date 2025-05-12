import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Promocion } from "@/data/tipos";

function TarjetaPromocion({ promocion }: { promocion: Promocion }) {
  return (
    <Card
      key={promocion.id}
      className="flex w-fit max-w-[250px] flex-col items-center justify-between px-4 py-4 shadow-none transition-all hover:scale-102 md:max-w-[300px]"
    >
      <div
        id="informacion"
        className="flex max-w-[250px] flex-col items-center gap-2"
      >
        <Image
          id="imagen-producto"
          className="h-[120px] rounded-md object-cover"
          src={promocion.imagen}
          alt={promocion.nombre}
        />
        <div id="descripcion" className="flex w-full flex-col text-left">
          <h3 className="text-lg font-semibold">{promocion.nombre}</h3>
          <p className="text-sm font-light">{promocion.descripcion}</p>
        </div>
      </div>

      <Button
        id="aplicar-promocion"
        className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 flex w-full items-center justify-center gap-2"
      >
        <CirclePlus className="hidden md:block" />
        Aplicar Promoción
      </Button>
    </Card>
  );
}

export default TarjetaPromocion;
