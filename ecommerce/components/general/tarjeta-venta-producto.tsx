import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImageOffIcon, Trash } from "lucide-react";
import { ProductoRow } from "@/types/resumen-tipos";

interface PropType {
  producto: ProductoRow;
  cantidad: number;
  modificarCantidad: (cantidad: number) => void;
  eliminar: () => void;
}

function TarjetaVentaProducto(props: PropType) {
  const { producto, cantidad, modificarCantidad, eliminar } = props;
  return (
    <Card className="flex w-fit flex-row items-center justify-center p-1">
      <div id="imagen" className="flex aspect-square max-w-[128px]">
        {producto.imagen !== "" ? (
          <Image
            className="rounded-md object-cover"
            width={128}
            height={128}
            src={producto.imagen}
            alt={producto.nombre}
          />
        ) : (
          <div className="flex h-[128px] w-[128px] border border-dashed rounded-md items-center justify-center">
            <ImageOffIcon className="h-12 w-12" />
          </div>
        )}
      </div>
      <div className="items-left justify-left flex min-w-[200px] flex-col gap-2">
        <div id="descripcion">
          <h3 className="text-lg font-semibold">{producto.nombre}</h3>
          <p className="text-sm font-light">{producto.descripcion}</p>
        </div>
        <div id="precio" className="flex flex-row items-center gap-2">
          <Card className="flex h-fit w-fit flex-row items-center gap-2 py-0">
            <Button
              type="button"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                modificarCantidad(-1);
              }}
              variant={"ghost"}
            >
              -
            </Button>
            <p>{cantidad}</p>
            <Button
              type="button"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                modificarCantidad(1);
              }}
              variant={"ghost"}
            >
              +
            </Button>
          </Card>
          <p className="text-brand-primary font-semibold">
            $
            {(producto.precio * cantidad)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
      </div>
      <div
        id="informacion"
        className="items-right flex min-w-[120px] flex-col justify-center gap-2"
      >
        <div className="items-right flex flex-col gap-0">
          <p className="text-right text-sm font-semibold">
            ${producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
          <p className="text-right text-sm font-thin">Precio unitario</p>
        </div>
        <Button
          type="button"
          className="flex h-fit w-fit flex-row items-center gap-2 self-center"
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            eliminar();
          }}
        >
          <Trash size={16} />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default TarjetaVentaProducto;
