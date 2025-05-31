import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Database } from "@/types/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final";

interface PropType {
    producto: Database['public']['Tables']['producto']['Row'];
    detallesPedido: DetallesSobrePedido[],
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void,
    detalleId: string | null;
}

function TarjetaVentaProducto(props: PropType) {
    const { producto, detallesPedido, setDetallesPedido, detalleId } = props;
    const [detalleActual, setDetalleActual] = React.useState<DetallesSobrePedido | null>(null);

    function modificarCantidad(cantidad: number) {
        if (!detalleId) return;
        const detalleActual = detallesPedido.find(detalle => detalle.id === detalleId);
        if (detalleActual) {
            const nuevaCantidad = detalleActual.cantidad + cantidad;
            if (nuevaCantidad <= 0) return; // No permitir cantidades negativas o cero
            // Calcular suma de extras
            const sumaExtras = detalleActual.extras.reduce((total, extra) => total + (extra.precio * extra.cantidad), 0);
            const precio_final = nuevaCantidad * (detalleActual.producto.precio + sumaExtras);
            const newDetalle = { ...detalleActual, cantidad: nuevaCantidad, precio_final };
            setDetallesPedido(detallesPedido.map(detalle => {
                if (detalle.id === detalleId) {
                    return newDetalle;
                }
                return detalle;
            }));
        }
    }

    function ObtenerDetalleActual() {
        if (!detalleId) return;
        const detalleActual = detallesPedido.find(detalle => detalle.id === detalleId);
        if (detalleActual) {
            setDetalleActual(detalleActual);
        }
    }

    useEffect(() => {
        ObtenerDetalleActual();
    }, [detallesPedido, detalleId]);

    if (!detalleActual) {
        return <Skeleton className="h-[128px] w-full rounded-md" />;
    }

    return (
        <Card className="flex w-fit flex-row items-center justify-center p-1">
            <div id="imagen" className="flex aspect-square max-w-[128px]">
                {detalleActual.producto.imagen ? (<Image
                    className="rounded-md object-cover"
                    src={detalleActual.producto.imagen}
                    alt={detalleActual.producto.nombre}
                />) :
                    (<Skeleton className="h-[128px] w-[128px] rounded-md" />)}
            </div>
            <div className="items-left justify-left flex min-w-[200px] flex-col gap-2">
                <div id="descripcion">
                    <h3 className="text-lg font-semibold">{detalleActual.producto.nombre}</h3>
                    <p className="text-sm font-light">{detalleActual.producto.descripcion}</p>
                </div>
                <div id="precio" className="flex flex-row items-center gap-2">
                    <Card className="flex h-fit w-fit flex-row items-center gap-2 py-0">
                        <Button
                            className="h-8 w-8"
                            onClick={() => modificarCantidad(-1)}
                            variant={"ghost"}
                        >
                            -
                        </Button>
                        <p>{detalleActual.cantidad}</p>
                        <Button
                            className="h-8 w-8"
                            onClick={() => modificarCantidad(1)}
                            variant={"ghost"}
                        >
                            +
                        </Button>
                    </Card>
                    <p className="text-brand-primary font-semibold">
                        $
                        {(detalleActual.producto.precio * detalleActual.cantidad)
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
                        ${detalleActual.producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                    <p className="text-right text-sm font-thin">Precio unitario</p>
                </div>
                <Button
                    className="flex h-fit w-fit flex-row items-center gap-2 self-center"
                    variant="destructive"
                    onClick={() => setDetallesPedido(detallesPedido.filter(detalle => detalle.producto.id !== detalleActual.producto.id))}
                >
                    <Trash size={16} />
                    Eliminar
                </Button>
            </div>
        </Card>
    );
}

export default TarjetaVentaProducto;