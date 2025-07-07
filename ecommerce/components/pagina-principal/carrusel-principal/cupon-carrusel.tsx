import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Clock, ImageOffIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CuponRow } from "@/types/resumen-tipos";
import { useCarritoStore } from "@/components/providers/carrito-provider";
import { redirect } from "next/navigation";

interface PropType {
  cupon: CuponRow;
}

function CuponCarrusel(props: PropType) {
  const { cupon } = props;
  const aplicarCupon = useCarritoStore((state) => state.aplicarCupon);

  return (
    <Card className="h-fit px-2 py-2">
      <div className="relative h-[460px] w-full">
        {cupon.imagen_url !== "" ? (
          <Image
            className="rounded-lg object-cover"
            quality={100}
            fill
            sizes="100vw"
            src={cupon.imagen_url}
            alt={cupon.nombre}
          />
        ) : (
          <div className="flex h-[460px] w-full items-center justify-center">
            <ImageOffIcon className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-0 flex h-full w-fit flex-col justify-center gap-2 rounded-lg bg-linear-to-r/srgb from-black/50 to-transparent p-4">
          <Badge className="bg-brand-state-1 text-brand-state-1-foreground hover:bg-brand-state-1 w-fit text-xs">
            Oferta por tiempo limitado
          </Badge>
          <h3 className="text-primary-foreground dark:text-primary text-md font-bold md:text-5xl">
            {cupon.nombre}
          </h3>
          <div className="dark:text-primary flex flex-row items-center gap-2">
            <Clock className="text-primary-foreground dark:text-primary size-4 md:size-6" />
            <p className="text-primary-foreground dark:text-primary text-sm font-light md:text-2xl">
              Valido hasta el{" "}
              <span className="font-bold">{cupon.fecha_fin}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              aplicarCupon(cupon);
              redirect("/menu");
            }}
            className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-2 w-fit"
          >
            Ordenar Ahora
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CuponCarrusel;
