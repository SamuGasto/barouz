"use client";
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database } from "@/types/supabase";
import { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final";
import TarjetaVentaProducto from "./tarjeta-venta-producto";
import obtenerExtras from "@/utils/querys/extras/obtener-extras";
import { Separator } from "@/components/ui/separator";
import Extras from "./extras";

interface PropType {
    producto: Database['public']['Tables']['producto']['Row']
    detallesPedido: DetallesSobrePedido[]
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void
}

function DialogAnadirProducto({ producto, detallesPedido, setDetallesPedido }: PropType) {
    const [open, setOpen] = React.useState(false);
    const [pedido, setPedido] = React.useState<Database['public']['Tables']['pedido']['Row']>({
        id: "",
        producto_id: "",
        cantidad: 1,
        created_at: "",
        pedido_final_id: "",
        precio_final: producto.precio,
    });
    const [precioFinal, setPrecioFinal] = React.useState(producto.precio);
    const [detalleId, setDetalleId] = React.useState<string | null>(null);

    function GenerarDetalle(idDetalle: string) {
        const newDetalle: DetallesSobrePedido = {
            id: idDetalle,
            producto: producto,
            extras: [],
            cantidad: pedido.cantidad,
            precio_final: precioFinal,
        };
        setDetallesPedido([...detallesPedido, newDetalle]);
    }

    function RemoverDetalle() {
        if (!detalleId) return;
        const newDetallesPedido = detallesPedido.filter(detalle => detalle.id !== detalleId);
        setDetallesPedido(newDetallesPedido);
    }

    function CalcularPrecioFinal() {
        const total_extras = detallesPedido.reduce(
            (total, detalle) =>
                total +
                detalle.extras.reduce(
                    (total, extra) =>
                        total +
                        extra.precio * extra.cantidad,
                    0,
                ),
            0,
        );


        const precioFinal = pedido.cantidad *
            (producto.precio +
                total_extras);

        setPrecioFinal(precioFinal);
        setPedido({ ...pedido, precio_final: precioFinal });
        console.log(detallesPedido);
    }

    function AbrirCerrar(bool: boolean, guardarCambios: boolean = false) {
        if (bool) {
            const newId = crypto.randomUUID();
            setDetalleId(newId);
            GenerarDetalle(newId);
        }
        else {
            if (!guardarCambios) {
                RemoverDetalle();
            }
            setDetalleId(null);
        }
        setOpen(bool);
    }


    useEffect(() => {
        if (!open) {
            setPedido({
                id: "",
                producto_id: "",
                cantidad: 1,
                created_at: "",
                pedido_final_id: "",
                precio_final: 0,
            });
            setPrecioFinal(producto.precio);
        }
    }, [open]);

    useEffect(() => {
        CalcularPrecioFinal();
    }, [detallesPedido]);

    return (
        <Dialog modal open={open} onOpenChange={(state) => {
            AbrirCerrar(state);
        }}>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>
                    <CirclePlus />
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
                    detallesPedido={detallesPedido}
                    setDetallesPedido={setDetallesPedido}
                    detalleId={detalleId}
                />
                <ScrollArea className="flex max-h-[280px] w-full flex-col items-center justify-center gap-4">
                    <Extras
                        pedido={pedido}
                        producto={producto}
                        detallesPedido={detallesPedido}
                        setDetallesPedido={setDetallesPedido}
                        detalleId={detalleId}
                    />
                </ScrollArea>
                <DialogFooter className="flex w-full items-center justify-center gap-2 sm:flex-col">
                    <Separator />
                    <div className="flex w-full flex-row items-center justify-between gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-center text-xl font-light">Total</p>
                            <p className="text-brand-primary text-center text-2xl font-semibold">
                                {(() => {
                                    const detalleActual = detallesPedido.find(d => d.id === detalleId);
                                    let total = 0;
                                    if (detalleActual) {
                                        total = detalleActual.precio_final;
                                    } else if (open) {
                                        total = pedido.precio_final;
                                    } else {
                                        total = producto.precio;
                                    }

                                    return `$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                                })()}
                            </p>
                        </div>
                        <Button
                            className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
                            type="submit"
                            onClick={() => {
                                AbrirCerrar(false, true);
                            }}
                        >
                            Confirmar Pedido
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogAnadirProducto;