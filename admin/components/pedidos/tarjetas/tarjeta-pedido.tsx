"use client"

import { Button } from "@/components/ui/button"
import { Clock, FileText, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { PedidoBadge } from "./pedido-badge"
import type { Database } from "@/types/supabase"
import { useEffect, useState } from "react"
import obtenerDatosUsuarioDePedido from "@/utils/querys/usuario/obtener-datos-usuario-de-pedido"
import { DialogEditarPedido } from "./dialog-editar-pedido"
import obtenerPedidosSegunPedidoFinal, { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface TarjetaPedidoProps {
    pedido: Database['public']['Tables']['pedido_final']['Row']
    onEdit: (pedido: Database['public']['Tables']['pedido_final']['Row']) => void
    onCancel?: (orderId: string) => void
    onUpdateStatus: (orderId: string) => void
    onReactivate?: (orderId: string) => void
    showCancelButton?: boolean
    showReactivateButton?: boolean
    menu: Database['public']['Tables']['producto']['Row'][]
    todosUsuarios: Database['public']['Tables']['usuario']['Row'][]
}

export function TarjetaPedido({
    pedido,
    onEdit,
    onCancel,
    onUpdateStatus,
    onReactivate,
    showCancelButton = false,
    showReactivateButton = false,
    menu,
    todosUsuarios,
}: TarjetaPedidoProps) {
    const getActionButtonText = () => {
        if (showReactivateButton) return "Reactivar Pedido"

        switch (pedido.estado) {
            case "Recibido":
                return "Iniciar Preparación"
            case "En preparación":
                return pedido.tipo_envio === "Delivery" ? "Enviar Pedido" : "Listo para Entrega"
            case "En camino":
                return "Marcar Entregado"
            default:
                return "Completar Pedido"
        }
    }

    const getActionButtonIcon = () => {
        if (showReactivateButton) return null

        switch (pedido.estado) {
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

    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState<Database['public']['Tables']['usuario']['Row'] | null>(null);
    const [todosSubPedidos, setTodosSubPedidos] = useState<DetallesSobrePedido[]>([]);

    useEffect(() => {
        const getData = async () => {
            const usuario = await obtenerDatosUsuarioDePedido(pedido.user_id);
            setUsuario(usuario);
            const todosLosSubPedidos = await obtenerPedidosSegunPedidoFinal(pedido.id);
            setTodosSubPedidos(todosLosSubPedidos != null ? todosLosSubPedidos : []);
            setLoading(false);
        }
        getData();
    }, [pedido.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <Card className="py-0 gap-1" draggable>
            <div className="flex items-center justify-between p-4 rounded-t-lg">
                <div className="grid gap-1">
                    <div className="font-semibold">
                        {usuario?.nombre}
                    </div>
                    <div className="text-sm">
                        <Clock className="inline-block mr-1 h-3 w-3" /> {formatearFechaHora(pedido.fecha_hora)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PedidoBadge status={pedido.estado} />
                </div>
            </div>

            <div className="border-t px-4 py-3">
                <div className="space-y-2">
                    {todosSubPedidos.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <div className="flex flex-row items-center gap-2">
                                {item.cantidad}x {item.producto.nombre}
                                {item.extras.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {item.extras.map((extra, idx) => (
                                            <Badge key={idx} className="bg-brand-primary/70">{extra.nombre}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="font-medium">{item.precio_final}</div>
                        </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                        <div>Total</div>
                        <div>{pedido.total_final}</div>
                    </div>
                    {pedido.razon_cancelacion && (
                        <div className="mt-2 p-2 rounded border ">
                            <div className="text-sm font-medium ">Motivo de cancelación:</div>
                            <div className="text-sm">{pedido.razon_cancelacion}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-3 rounded-b-lg">
                <Button
                    variant="outline"
                    size="sm"
                >
                    <FileText className="mr-2 h-3 w-3" />
                    Imprimir
                </Button>
                <DialogEditarPedido
                    pedido={pedido}
                    usuario={usuario}
                    todosLosProductos={menu}
                    detalles={todosSubPedidos}
                    onSave={() => { }}
                    onCancel={() => { }}
                    todosUsuarios={todosUsuarios}
                />
                {showCancelButton && onCancel && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(pedido.id)}
                    >
                        <XCircle className="mr-2 h-3 w-3" />
                        Cancelar
                    </Button>
                )}
                <Button
                    size="sm"
                    onClick={() => (showReactivateButton && onReactivate ? onReactivate(pedido.id) : onUpdateStatus(pedido.id))}
                >
                    {getActionButtonIcon()}
                    {getActionButtonText()}
                </Button>
            </div>
        </Card >
    )
}