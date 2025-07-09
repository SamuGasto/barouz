"use client"

import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { PedidoBadge } from "./pedido-badge"
import type { Database } from "@/types/supabase"
import { DialogPedido } from "./dialog-pedido"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useDetallePedidosFinal, useEliminarPedidoFinal, usePedidosPorPedidoFinal } from "@/hooks/usePedidosFinales"
import { parseTimestamp } from "@/utils/timestamp-chile"
import { UsuarioRow } from "@/types/tipos_supabase_resumidos"
import { TodosLosPedidos } from "@/types/res_pedidos_final"
import AlertDialogEliminarPedido from "./alert-dialog-eliminar-pedido"
import { useCambiarEstadoPedidoFinal } from "@/hooks/usePedidosFinales"
import { cn } from "@/lib/utils"
import { BotonImprimirPedido } from "../imprimir-pedido"

interface TarjetaPedidoProps {
    pedido_final: TodosLosPedidos["pedido_final"]
    usuarios: UsuarioRow[]
}

function ColoresTarjetaSegunEstadoPedido(pedido_final: TodosLosPedidos["pedido_final"]) {
    switch (pedido_final.informacion.estado) {
        case "Recibido":
            return "border-l-sky-200 border-l-8 dark:border-l-sky-800"
        case "En preparación":
            return "border-l-yellow-200 border-l-8 dark:border-l-yellow-800"
        case "En camino":
            return "border-l-blue-200 border-l-8 dark:border-l-blue-800"
        case "Entregado":
            return "border-l-green-200 border-l-8 dark:border-l-green-800"
        case "Cancelado":
            return "border-l-red-200 border-l-8 dark:border-l-red-800"
        default:
            return "border-l-gray-200 border-l-8 dark:border-l-gray-800"
    }
}

export function TarjetaPedido({
    pedido_final,
    usuarios,
}: TarjetaPedidoProps) {
    // --- GUARDIA PRINCIPAL: Si no hay datos, no renderizar nada para evitar crashes.
    if (!pedido_final || !pedido_final.informacion) {
        console.error("TarjetaPedido recibió un pedido inválido:", pedido_final);
        return null;
    }
    const { mutate: cambiarEstadoPedidoFinal } = useCambiarEstadoPedidoFinal()

    const usuario = usuarios.find((usuario) => usuario.id === pedido_final.informacion.user_id);


    function obtenerSiguienteEstado(): Database['public']['Enums']['EstadoPedidos'] {
        switch (pedido_final.informacion.estado) {
            case "Recibido":
                return "En preparación"
            case "En preparación":
                return "En camino";
            case "En camino":
                return "Entregado";
            case "Entregado":
                return "Entregado";
            case "Cancelado":
                return "Cancelado";
            default:
                return "Recibido";
        }
    }

    const formatearFechaHora = (fechaHora: string) => {
        const { date, time } = parseTimestamp(fechaHora);
        return `${date} ${time}`;
    }

    const formatCurrency = (value: number | null | undefined) => {
        if (value == null) return '$0';
        return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    }



    return (
        <div className="w-fit h-fit">
            <Card className={cn("flex flex-col py-0 gap-1 w-[250px] md:w-[450px] h-fit dark:bg-zinc-900", ColoresTarjetaSegunEstadoPedido(pedido_final))}>
                <div className="flex items-center justify-between p-3 rounded-t-lg">
                    <div className="grid gap-0.5">
                        <div className="font-semibold text-sm sm:text-base">
                            {usuario?.nombre || 'Cliente sin nombre'}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                            <Clock className="inline-block mr-1 h-3 w-3" />
                            {pedido_final.informacion.fecha_hora ? formatearFechaHora(pedido_final.informacion.fecha_hora) : 'Sin fecha'}
                        </div>
                    </div>
                    <PedidoBadge status={pedido_final.informacion.estado} />
                </div>

                <div className="border-t px-3 py-2">
                    <div className="space-y-1.5">
                        {pedido_final.pedidos?.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs sm:text-sm">
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {item.informacion.cantidad}x {item.producto?.nombre || 'Producto no encontrado'}
                                    </span>
                                    {item.extras && item.extras.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                            {item.extras.map((extra, idx) => (
                                                <Badge key={idx} className="bg-brand-primary/70 text-[10px] h-4 px-1.5 py-0">
                                                    +{extra.extra?.nombre}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="font-medium ml-2 whitespace-nowrap">
                                    {formatCurrency(item.informacion.precio_final)}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between font-medium pt-1.5 border-t mt-1 text-sm">
                            <div>Total</div>
                            <div className="font-semibold">{formatCurrency(pedido_final.informacion.total_final)}</div>
                        </div>
                        {pedido_final.informacion.razon_cancelacion && (
                            <div className="mt-2 p-2 rounded border ">
                                <div className="text-sm font-medium ">Motivo de cancelación:</div>
                                <div className="text-sm">{pedido_final.informacion.razon_cancelacion}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-row items-center justify-center gap-1.5 p-2 border-t rounded-b-lg bg-muted/20">
                    {pedido_final.informacion.estado !== "Cancelado" && pedido_final.informacion.estado !== "Entregado" && <AlertDialogEliminarPedido pedido_id={pedido_final.informacion.id} />}

                    <BotonImprimirPedido 
                        pedido_final={pedido_final} 
                        usuario={usuario} 
                    />

                    <DialogPedido
                        pedido_final_arg={pedido_final}
                        usuarios={usuarios}
                        className="h-8 px-2 text-xs"
                    />

                    {pedido_final.informacion.estado !== "Cancelado" && pedido_final.informacion.estado !== "Entregado" && <Button
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => cambiarEstadoPedidoFinal({ pedido_final_id: pedido_final.informacion.id, estado: obtenerSiguienteEstado() })}
                    >
                        <ArrowRight className="mr-2 h-3 w-3" />
                        {obtenerSiguienteEstado()}
                    </Button>}
                </div>
            </Card >
        </div>
    )
}