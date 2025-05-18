"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Extra, Pedido, Producto } from "@/data/tipos";
import { CirclePlus } from "lucide-react";
import TarjetaVentaProducto from "../tarjeta-venta-producto";
import extras_waffle from "@/data/extras-waffle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Extras from "./extras";

interface PropType {
  producto: Producto;
}

function DialogAnadirProducto(props: PropType) {
  const { producto } = props;
  const [open, setOpen] = React.useState(false);
  function DefinirExtra() {
    switch (producto.categoria) {
      case "Waffles":
        return extras_waffle;
      default:
        return [];
    }
  }
  const [pedido, setPedido] = React.useState<Pedido>({
    id: "",
    producto_id: producto.id,
    cantidad: 1,
    extras: DefinirExtra(),
    precio_final: 0,
  });

  function CalcularPrecioFinal() {
    setPedido({
      ...pedido,
      precio_final:
        pedido.cantidad * producto.precio +
        pedido.extras.reduce(
          (total, extra) =>
            total +
            extra.detalle.reduce((total, detalle) => total + detalle.precio, 0),
          0,
        ),
    });
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 flex w-full items-center justify-center gap-2">
          <CirclePlus />
          Agregar al carrito
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[600px] w-fit min-w-[600px] flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Personalización</DialogTitle>
          <DialogDescription>
            Personaliza tu producto a tu gusto antes de agregarlo al carrito.
          </DialogDescription>
        </DialogHeader>
        <TarjetaVentaProducto
          producto={producto}
          cantidad={pedido.cantidad}
          modificarCantidad={(nuevaCantidad) => {
            const cantidad = pedido.cantidad + nuevaCantidad;
            console.log(cantidad);

            if (cantidad < 1) return;
            setPedido({ ...pedido, cantidad });
            CalcularPrecioFinal();
          }}
        />
        <ScrollArea className="flex max-h-[280px] w-full flex-col items-center justify-center gap-4">
          <Extras
            categoria={producto.categoria}
            extra={pedido.extras}
            setExtra={(extras) => {
              setPedido({ ...pedido, extras });
              CalcularPrecioFinal();
            }}
          />
        </ScrollArea>
        <DialogFooter>
          <Button
            className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
            type="submit"
          >
            Agregar al carrito
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAnadirProducto;
