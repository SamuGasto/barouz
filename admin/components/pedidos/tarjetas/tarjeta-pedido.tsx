"use client"

import { Button } from "@/components/ui/button"
import { Clock, FileText, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { PedidoBadge } from "./pedido-badge"
import type { Database } from "@/types/supabase"
import { DialogPedido } from "./dialog-pedido"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useDetallePedidosFinal, usePedidosPorPedidoFinal } from "@/hooks/usePedidosFinales"
import { parseTimestamp } from "@/utils/timestamp-chile"
import { UsuarioRow } from "@/types/tipos_supabase_resumidos"
import { TodosLosPedidos } from "@/types/res_pedidos_final"





interface TarjetaPedidoProps {
    pedido_final: TodosLosPedidos["pedido_final"]
    usuarios: UsuarioRow[]
    onCancel?: (orderId: string) => void
    onUpdateStatus: (orderId: string) => void
    onReactivate?: (orderId: string) => void
    showCancelButton?: boolean
    showReactivateButton?: boolean
}

export function TarjetaPedido({
    pedido_final,
    usuarios,
    onCancel,
    onUpdateStatus,
    onReactivate,
    showCancelButton = false,
    showReactivateButton = false,
}: TarjetaPedidoProps) {

    // --- GUARDIA PRINCIPAL: Si no hay datos, no renderizar nada para evitar crashes.
    if (!pedido_final || !pedido_final.informacion) {
        console.error("TarjetaPedido recibió un pedido inválido:", pedido_final);
        return null;
    }

    const usuario = usuarios.find((usuario) => usuario.id === pedido_final.informacion.user_id);

    function getActionButtonText() {
        switch (pedido_final.informacion.estado) {
            case "Recibido":
            case "En preparación":
                return "Enviar a cocina";
            case "En camino":
            case "Entregado":
                return "Entregar";
            case "Cancelado":
                return "Reactivar";
            default:
                return "";
        }
    }

    function getActionButtonIcon() {
        return <ArrowRight className="mr-2 h-3 w-3" />;
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
        <div className="w-full sm:w-[300px] md:w-[320px] lg:w-[350px] xl:w-[380px] h-fit">
            <Card className="flex flex-col py-0 gap-1 w-full h-full">
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

                <div className="flex flex-wrap items-center justify-end gap-1.5 p-2 border-t rounded-b-lg bg-muted/20">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Imprimir
                    </Button>
                    
                    <DialogPedido
                        pedido_final_arg={pedido_final}
                        usuarios={usuarios}
                        className="h-8 px-2 text-xs"
                    />

                    {showCancelButton && onCancel && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={() => onCancel(pedido_final.informacion.id)}
                        >
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancelar
                        </Button>
                    )}
                    
                    <Button
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => (showReactivateButton && onReactivate ? onReactivate(pedido_final.informacion.id) : onUpdateStatus(pedido_final.informacion.id))}
                    >
                        {getActionButtonIcon()}
                        {getActionButtonText()}
                    </Button>
                </div>
            </Card >
        </div>
    )
}