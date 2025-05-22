"use client";
import React, { useEffect } from "react";
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
import { Pedido, Producto } from "@/data/tipos";
import { CirclePlus } from "lucide-react";
import TarjetaVentaProducto from "../tarjeta-venta-producto";
import extras_waffle from "@/data/extras-waffle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Extras from "./extras";
import { Separator } from "@/components/ui/separator";

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
  const [precioFinal, setPrecioFinal] = React.useState(0);

  function CalcularPrecioFinal() {
    setPrecioFinal(
      pedido.cantidad *
        (producto.precio +
          pedido.extras.reduce(
            (total, extra) =>
              total +
              extra.detalle.reduce(
                (total, detalle) =>
                  detalle.cantidad > 0 ? total + detalle.precio : total,
                0,
              ),
            0,
          )),
    );
  }

  useEffect(() => {
    if (!open) {
      setPedido({
        id: "",
        producto_id: producto.id,
        cantidad: 1,
        extras: DefinirExtra(),
        precio_final: 0,
      });
      setPrecioFinal(0);
    }
  }, [open]);

  useEffect(() => {
    CalcularPrecioFinal();
  }, [pedido]);

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
            const cantidadActual = pedido.cantidad + nuevaCantidad;

            const newPedido = { ...pedido, cantidad: cantidadActual };

            if (cantidadActual > 0) {
              setPedido(newPedido);
            }
          }}
          eliminar={() => {
            setOpen(false);
          }}
        />
        <ScrollArea className="flex max-h-[280px] w-full flex-col items-center justify-center gap-4">
          <Extras
            pedido={pedido}
            extra={pedido.extras}
            setExtra={(extras) => {
              setPedido({ ...pedido, extras });
            }}
          />
        </ScrollArea>
        <DialogFooter className="flex w-full items-center justify-center gap-2 sm:flex-col">
          <Separator />
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-2">
              <p className="text-center text-xl font-light">Total</p>
              <p className="text-brand-primary text-center text-2xl font-semibold">
                ${precioFinal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <Button
              className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
              type="submit"
              onClick={() => {
                setPedido({ ...pedido, precio_final: precioFinal });
              }}
            >
              Agregar al carrito
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAnadirProducto;
