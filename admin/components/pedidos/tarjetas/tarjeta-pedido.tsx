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
        <Card className="py-0 gap-1 max-w-fit">
            <div className="flex items-center justify-between p-4 rounded-t-lg">
                <div className="grid gap-1">
                    <div className="font-semibold">
                        {usuario?.nombre || 'Cliente sin nombre'}
                    </div>
                    <div className="text-sm">
                        <Clock className="inline-block mr-1 h-3 w-3" />
                        {pedido_final.informacion.fecha_hora ? formatearFechaHora(pedido_final.informacion.fecha_hora) : 'Sin fecha'}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PedidoBadge status={pedido_final.informacion.estado} />
                </div>
            </div>

            <div className="border-t px-4 py-3">
                <div className="space-y-2">
                    {pedido_final.pedidos?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <div className="flex flex-row items-center gap-2">
                                {item.informacion.cantidad}x {item.producto?.nombre || 'Producto no encontrado'}
                                {item.extras && item.extras.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {item.extras.map((extra, idx) => (
                                            <Badge key={idx} className="bg-brand-primary/70">{extra.extra?.nombre}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="font-medium">{formatCurrency(item.informacion.precio_final)}</div>
                        </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                        <div>Total</div>
                        <div>{formatCurrency(pedido_final.informacion.total_final)}</div>
                    </div>
                    {pedido_final.informacion.razon_cancelacion && (
                        <div className="mt-2 p-2 rounded border ">
                            <div className="text-sm font-medium ">Motivo de cancelación:</div>
                            <div className="text-sm">{pedido_final.informacion.razon_cancelacion}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-end gap-2 p-3 rounded-b-lg">
                <div className="flex flex-row items-center gap-2">
                    <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-3 w-3" />
                        Imprimir
                    </Button>
                    <DialogPedido
                        pedido_final_arg={pedido_final}
                        usuarios={usuarios}
                    />
                </div>

                {showCancelButton && onCancel && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel && onCancel(pedido_final.informacion.id)}
                    >
                        <XCircle className="mr-2 h-3 w-3" />
                        Cancelar
                    </Button>
                )}
                <Button
                    size="sm"
                    onClick={() => (showReactivateButton && onReactivate ? onReactivate(pedido_final.informacion.id) : onUpdateStatus(pedido_final.informacion.id))}
                >
                    {getActionButtonIcon()}
                    {getActionButtonText()}
                </Button>
            </div>
        </Card >
    )
}