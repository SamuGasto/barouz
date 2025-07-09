import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CuponRow } from "@/types/resumen-tipos";
import { BotonAplicarCupon } from "./boton-aplicar-cupon";
import { ImageOffIcon } from "lucide-react";

interface TarjetaCuponProps {
  cupon: CuponRow;
  className?: string;
}

export function TarjetaCupon({
  cupon,
  className = ""
}: TarjetaCuponProps) {
  return (
    <Card
      className={`group w-[240px] relative overflow-hidden transition-all hover:shadow-md p-2 ${className}`}
    >
      <div className="relative aspect-video w-full">
        {cupon.imagen_url !== "" ? (
          <Image
            src={cupon.imagen_url}
            alt={cupon.nombre}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOffIcon className="h-12 w-12" />
          </div>
        )}
        {cupon.tipo_descuento === "porcentaje" && (
          <Badge
            variant="destructive"
            className="absolute left-2 top-2"
          >
            {`${cupon.tipo_descuento === "porcentaje" ? "%" : "$"} ${cupon.valor_descuento}`}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              {cupon.nombre}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {cupon.descripcion}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Badge variant="secondary" className="font-mono text-xs">
                {cupon.nombre}
              </Badge>
              {cupon.fecha_fin && (
                <p className="text-xs text-muted-foreground">
                  Válido hasta:{" "}
                  {cupon.fecha_fin}
                </p>
              )}
            </div>
          </div>

          <BotonAplicarCupon
            cupon={cupon}
          />
        </div>
      </CardContent>
    </Card>
  );
}