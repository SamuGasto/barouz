"use client"

import React from 'react'
import { Button } from '../../ui/button'
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '../../ui/card'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip'
import { UserPlus } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog'
import { useState, useEffect } from 'react'
import type { Database } from '@/types/supabase'
import obtenerTodosUsuarios from '@/utils/querys/usuario/obtener-todos-usuarios'
import obtenerPedidosSegunPedidoFinal, { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final'
import { Badge } from '../../ui/badge'
import ResumenPedido from '@/components/nuevo-pedido/resumen/resumen-pedido'
import { ScrollArea } from '@/components/ui/scroll-area'
import NuevoClienteDialog from './nuevo-cliente-dialog'

interface Props {
    detallesPedido: DetallesSobrePedido[]
    setDetallesPedido: React.Dispatch<React.SetStateAction<DetallesSobrePedido[]>>
}

function DetallesPedido({ detallesPedido, setDetallesPedido }: Props) {
    const [usuario, setUsuario] = useState<Database['public']['Tables']['usuario']['Row'] | null>(null)
    const [pedidoFinal, setPedidoFinal] = useState<Database['public']['Tables']['pedido_final']['Row']>({
        created_at: "",
        direccion: "",
        estado: "Recibido",
        fecha_hora: "",
        id: "",
        razon_cancelacion: "",
        tipo_envio: "Retiro en tienda",
        total_final: 0,
        user_id: ""
    })
    const [todosUsuarios, setTodosUsuarios] = useState<Database['public']['Tables']['usuario']['Row'][]>([])
    const [detallesPedidoLocal, setDetallesPedidoLocal] = useState<DetallesSobrePedido[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const todos_usuarios = await obtenerTodosUsuarios()
            setTodosUsuarios(todos_usuarios || [])
        }
        fetchUsers()
    }, [])

    // Estados para el Dialog de nuevo cliente
    const [isOpen, setIsOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [mostrarResumen, setMostrarResumen] = useState(false);
    const handleConfirmar = () => {
        setMostrarResumen(true);
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Detalles del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="clientName" className="text-right">
                            Cliente
                        </Label>
                        <div className="flex flex-row items-center gap-2">
                            <Select
                                value={usuario?.id || ""}
                                onValueChange={(value) => setUsuario({ ...usuario, id: value } as Database['public']['Tables']['usuario']['Row'])}
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
                            {/* Botón para abrir el dialog de nuevo cliente */}
                            {/* Componente modular para alta de cliente */}
                            <NuevoClienteDialog />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="orderType">Tipo de Pedido</Label>
                        <RadioGroup
                            id="orderType"
                            value={pedidoFinal.tipo_envio}
                            onValueChange={(value: "Delivery" | "Retiro en tienda") => setPedidoFinal({ ...pedidoFinal, tipo_envio: value })}
                            className="flex space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Retiro en tienda" id="takeaway" />
                                <Label htmlFor="takeaway" className="cursor-pointer">
                                    Para llevar
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="delivery" id="delivery" />
                                <Label htmlFor="delivery" className="cursor-pointer">
                                    Delivery
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {pedidoFinal.tipo_envio === "Delivery" && (
                        <div>
                            <Label htmlFor="address">Dirección de Entrega</Label>
                            <Input
                                id="address"
                                placeholder="Ingrese la dirección completa"
                                className="mt-1"
                                value={pedidoFinal.direccion}
                                onChange={(e) => setPedidoFinal({ ...pedidoFinal, direccion: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="border-t pt-4 mt-4">
                        <h3 className="font-medium mb-3">Productos seleccionados</h3>
                        {detallesPedido.length === 0 ? (
                            <p className="text-left text-foreground/70">No hay productos seleccionados</p>
                        ) : (
                            <ScrollArea className="flex flex-col gap-2 max-h-[220px]">
                                <div className="flex flex-col gap-2">
                                    {detallesPedido.map((item, idx) => (
                                        <div key={item.id} className="bg-card rounded-md border flex flex-row items-center justify-between px-2 py-1 transition hover:shadow-sm gap-2">
                                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                <span className="font-medium text-sm truncate flex items-center gap-1">
                                                    {item.cantidad}x {item.producto.nombre}
                                                </span>
                                                {item.extras.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-0.5 mt-0.5">
                                                        {item.extras.map((extra, idx) => (
                                                            <Badge key={idx} className="bg-brand-primary/70 text-[11px] px-1 py-0.5 font-normal">{extra.nombre}</Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-brand-primary text-base min-w-[60px] text-end">
                                                    ${item.precio_final.toLocaleString()}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 h-7 w-7"
                                                    title="Eliminar producto"
                                                    onClick={() => setDetallesPedido(detallesPedido.filter(det => det.id !== item.id))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col border-t pt-4">
                {/* Calcula el subtotal actualizado y pásalo a ResumenPedido */}
                <ResumenPedido
                    subtotal={detallesPedido.reduce((acc, d) => acc + (d.precio_final || 0), 0)}
                    taxRate={0.16}
                />
                <div className="mt-4 grid w-full gap-2">
                    <Button disabled={detallesPedido.length === 0}>Confirmar Pedido</Button>
                    <Button variant="outline" disabled={detallesPedido.length === 0}>
                        Guardar como Borrador
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default DetallesPedido