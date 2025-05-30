"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Trash2, Save, X } from "lucide-react"
import type { Database } from "@/types/supabase"
import { useEffect, useState } from "react"
import obtenerDetalleProductos from "@/utils/querys/productos/obtener-detalle-productos"
import { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DialogEditarPedidoProps {
    pedido: Database['public']['Tables']['pedido_final']['Row'] | null,
    detalles: DetallesSobrePedido[]
    usuario: Database['public']['Tables']['usuario']['Row'] | null
    todosUsuarios: Database['public']['Tables']['usuario']['Row'][]
    todosLosProductos: Database['public']['Tables']['producto']['Row'][]
    onSave: () => void
    onCancel: () => void
}

export function DialogEditarPedido({
    pedido,
    detalles,
    usuario,
    todosLosProductos,
    todosUsuarios,
    onSave,
    onCancel,
}: DialogEditarPedidoProps) {
    if (!pedido) return null

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Database['public']['Tables']['pedido']['Row'][]>([])

    const [nuevoUsuario, setNuevoUsuario] = useState<Database['public']['Tables']['usuario']['Row'] | null>(usuario)
    const [nuevoPedido, setNuevoPedido] = useState<Database['public']['Tables']['pedido_final']['Row']>(pedido)
    const [nuevosProductos, setNuevosProductos] = useState<DetallesSobrePedido[]>(detalles)
    const [productoPorAnadir, setProductoPorAnadir] = useState<string>("")


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                >
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Editar Pedido de {usuario?.nombre}</DialogTitle>
                    <DialogDescription>
                        Modifica los detalles del pedido y haz clic en guardar cuando termines.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="clientName" className="text-right">
                            Cliente
                        </Label>
                        <Select
                            value={nuevoUsuario?.id || ""}
                            onValueChange={(value) => setNuevoUsuario({ ...nuevoUsuario, id: value } as Database['public']['Tables']['usuario']['Row'])}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {todosUsuarios?.map((usuario) => (
                                    <SelectItem
                                        key={usuario.id}
                                        value={usuario.id}
                                    >
                                        {usuario.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="orderType" className="text-right">
                            Tipo
                        </Label>
                        <RadioGroup
                            id="orderType"
                            value={nuevoPedido.tipo_envio}
                            onValueChange={(value) => setNuevoPedido({ ...nuevoPedido, tipo_envio: value as "Delivery" | "Retiro en tienda" })}
                            className="col-span-3 flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Retiro en tienda" id="takeaway" />
                                <Label htmlFor="takeaway" className="cursor-pointer">
                                    Retiro en tienda
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Delivery" id="delivery" />
                                <Label htmlFor="delivery" className="cursor-pointer">
                                    Delivery
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="orderStatus" className="text-right">
                            Estado
                        </Label>
                        <Select value={nuevoPedido.estado} onValueChange={(value: "Recibido" | "En preparación" | "En camino" | "Entregado" | "Cancelado") => setNuevoPedido({ ...nuevoPedido, estado: value })}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    value="Recibido"
                                >
                                    Recibido
                                </SelectItem>
                                <SelectItem
                                    value="En preparación"
                                >
                                    En preparación
                                </SelectItem>
                                <SelectItem
                                    value="En camino"
                                >
                                    En camino
                                </SelectItem>
                                <SelectItem
                                    value="Entregado"
                                >
                                    Entregado
                                </SelectItem>
                                <SelectItem
                                    value="Cancelado"
                                >
                                    Cancelado
                                </SelectItem>
                                <SelectItem
                                    value="Cancelado"
                                >
                                    Cancelado
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {pedido.estado === "Cancelado" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cancellationReason" className="text-right">
                                Motivo
                            </Label>
                            <Textarea
                                id="cancellationReason"
                                value={nuevoPedido.razon_cancelacion || ""}
                                onChange={(e) => setNuevoPedido({ ...nuevoPedido, razon_cancelacion: e.target.value })}
                                placeholder="Motivo de la cancelación"
                                className="col-span-3"
                            />
                        </div>
                    )}

                    <div className="mt-2">
                        <div className="flex justify-between items-center mb-2">
                            <Label className="font-medium">Productos</Label>
                            <div className="flex items-center gap-2">
                                <Select value={productoPorAnadir} onValueChange={setProductoPorAnadir}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Seleccionar producto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {todosLosProductos.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.nombre}
                                            >
                                                {item.nombre} - ${item.precio}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => {
                                        const producto: Database['public']['Tables']['producto']['Row'] | undefined = todosLosProductos.find((item) => item.nombre === productoPorAnadir);
                                        if (producto) {
                                            const elementtoPorAnadir: DetallesSobrePedido = {
                                                producto: producto,
                                                extras: [],
                                                cantidad: 1,
                                                precio_final: producto.precio,
                                            }
                                            setNuevosProductos([...nuevosProductos, elementtoPorAnadir]);
                                            setProductoPorAnadir('');
                                        }
                                    }}
                                    disabled={productoPorAnadir === ''}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="border rounded-md">
                            {nuevosProductos === null ? (
                                <div className="text-center py-4">No hay productos en este pedido</div>
                            ) : (
                                <ScrollArea className="flex flex-col max-h-[210px]">
                                    {nuevosProductos.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="font-medium">{item.producto.nombre}</div>
                                                    <div>{item.extras.map((extra) => (<Badge key={extra.id} className="bg-brand-primary/70">{extra.nombre}</Badge>))}</div>
                                                </div>
                                                <div className="text-sm">${item.precio_final}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => setNuevosProductos(nuevosProductos.map((item, i) => i === index ? { ...item, cantidad: item.cantidad - 1 > 0 ? item.cantidad - 1 : 1, precio_final: (item.precio_final / item.cantidad) * (item.cantidad - 1 > 0 ? item.cantidad - 1 : 1) } : item))}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-6 text-center font-medium">{item.cantidad}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => setNuevosProductos(nuevosProductos.map((item, i) => i === index ? { ...item, cantidad: item.cantidad + 1, precio_final: (item.precio_final / item.cantidad) * (item.cantidad + 1) } : item))}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => setNuevosProductos(nuevosProductos.filter((_, i) => i !== index))}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                    </Button>
                    <Button onClick={onSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
