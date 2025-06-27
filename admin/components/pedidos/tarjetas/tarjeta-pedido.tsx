"use client"

import { Button } from "@/components/ui/button"
import { Clock, FileText, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { PedidoBadge } from "./pedido-badge"
import type { Database } from "@/types/supabase"
import { useState } from "react"
import { DialogPedido } from "./dialog-pedido"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useDetallePedidosFinal } from "@/hooks/usePedidos"

type PedidoFinalRow = Database['public']['Tables']['pedido_final']['Row']
type UsuarioRow = Database['public']['Tables']['usuario']['Row']
type ProductoRow = Database['public']['Tables']['producto']['Row']
type ExtraRow = Database['public']['Tables']['extra']['Row']



interface TarjetaPedidoProps {
    pedido_final: PedidoFinalRow
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
    const { data: detalles, isPending: detallesPending } = useDetallePedidosFinal(pedido_final.id)

    const isBusy = detallesPending

    const getActionButtonText = () => {
        if (showReactivateButton) return "Reactivar Pedido"

        switch (pedido_final.estado) {
            case "Recibido":
                return "Iniciar Preparación"
            case "En preparación":
                return pedido_final.tipo_envio === "Delivery" ? "Enviar Pedido" : "Listo para Entrega"
            case "En camino":
                return "Marcar Entregado"
            default:
                return "Completar Pedido"
        }
    }

    const getActionButtonIcon = () => {
        if (showReactivateButton) return null

        switch (pedido_final.estado) {
            case "Recibido":
            case "En preparación":
                return <ArrowRight className="mr-2 h-3 w-3" />
            case "En camino":
                return <CheckCircle className="mr-2 h-3 w-3" />
            default:
                return null
        }
    }

    const formatearFechaHora = (fechaHora: string) => {
        const fecha = fechaHora.split("T")[0];
        const fechaFormateada = fecha.split("-").reverse().join("-");

        const hora = fechaHora.split("T")[1].split("+")[0].split(":").map((item, index) => { if (index === 0 || index === 1) return item; }).join(":").slice(0, -1);
        return `${fechaFormateada} ${hora}`;
    }

    if (isBusy) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <Card className="py-0 gap-1 max-w-fit">
            <div className="flex items-center justify-between p-4 rounded-t-lg">
                <div className="grid gap-1">
                    <div className="font-semibold">
                        {usuarios.find((usuario) => usuario.id === pedido_final.user_id)?.nombre}
                    </div>
                    <div className="text-sm">
                        <Clock className="inline-block mr-1 h-3 w-3" /> {formatearFechaHora(pedido_final.fecha_hora)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PedidoBadge status={pedido_final.estado} />
                </div>
            </div>

            <div className="border-t px-4 py-3">
                <div className="space-y-2">
                    {detalles?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <div className="flex flex-row items-center gap-2">
                                {item.cantidad}x {item.producto?.nombre}
                                {item.pedido_extra.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {item.pedido_extra.map((extra, idx) => (
                                            <Badge key={idx} className="bg-brand-primary/70">{extra.extra?.nombre}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="font-medium">{item.precio_final}</div>
                        </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                        <div>Total</div>
                        <div>{pedido_final.total_final}</div>
                    </div>
                    {pedido_final.razon_cancelacion && (
                        <div className="mt-2 p-2 rounded border ">
                            <div className="text-sm font-medium ">Motivo de cancelación:</div>
                            <div className="text-sm">{pedido_final.razon_cancelacion}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-end gap-2 p-3 rounded-b-lg">
                <div className="flex flex-row items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <FileText className="mr-2 h-3 w-3" />
                        Imprimir
                    </Button>
                    <DialogPedido
                        pedido_final={pedido_final}
                        detalles={detalles}
                        usuarios={usuarios}
                    />
                </div>

                {showCancelButton && onCancel && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(pedido_final.id)}
                    >
                        <XCircle className="mr-2 h-3 w-3" />
                        Cancelar
                    </Button>
                )}
                <Button
                    size="sm"
                    onClick={() => (showReactivateButton && onReactivate ? onReactivate(pedido_final.id) : onUpdateStatus(pedido_final.id))}
                >
                    {getActionButtonIcon()}
                    {getActionButtonText()}
                </Button>
            </div>
        </Card >
    )
}