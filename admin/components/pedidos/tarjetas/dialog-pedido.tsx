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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Trash2, Save, X, Pencil, ShoppingBag } from "lucide-react"
import type { Database } from "@/types/supabase"
import { useState } from "react"
import { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import z from "zod/v4"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useUsuarios, { useUsuarioByID } from "@/hooks/useUsuarios"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import GestorPedidos from "./gestor-pedidos"
import { useConstruirPedido, useDatosPedidoFinal, useDetallePedidosFinal } from "@/hooks/usePedidos"
import { Tables } from "@/types/supabase"

type PedidoRow = Database['public']['Tables']['pedido_final']['Row']
type UsuarioRow = Database['public']['Tables']['usuario']['Row']
type Detalles = ReturnType<typeof useDetallePedidosFinal>["data"]

const DialogFormScheme = z.object({
    pedido_final: z.object({
        user_id: z.string(),
        tipo_envio: z.enum(["Delivery", "Retiro en tienda"]),
        estado: z.enum(["Recibido", "En preparación", "En camino", "Entregado", "Cancelado"]),
        razon_cancelacion: z.string().optional(),
    }),
    pedidos: z.array(z.object({
        pedido_id: z.string(),
        producto: z.object({
            id: z.string(),
            nombre: z.string(),
            precio: z.number(),
            categoria_producto: z.enum(["Waffles", "Helados", "Churros", "Waffle Cookies", "Postres", "Bebidas", "Otros"]),
        }),
        cantidad: z.number(),
        precio_final: z.number(),
        extras: z.array(z.object({
            extra_id: z.string(),
            extra_nombre: z.string(),
            cantidad: z.number(),
            precio_final: z.number(),
        }))
    })),
    usuario: z.object({
        id: z.string(),
    }),
})

interface DialogPedidoProps {
    pedido_final: PedidoRow | undefined,
    detalles: Detalles,
    usuarios: UsuarioRow[],
}

export function DialogPedido({
    pedido_final,
    detalles,
    usuarios
}: DialogPedidoProps) {
    const [open, setOpen] = useState(false)
    function ObtenerUsuario(pedido_final: PedidoRow | undefined) {
        if (!pedido_final) {
            return {
                id: "local",
                nombre: "Tienda Barouz",
            }
        }
        const usuarioEncontrado = usuarios?.find((item) => item.id === pedido_final?.user_id)
        if (usuarioEncontrado) {
            return {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
            }
        }
        return {
            id: "local",
            nombre: "Tienda Barouz",
        }
    }

    const { mutateAsync: construirPedido, isPending: isConstruyendoPedido } = useConstruirPedido()
    const [isCancelado, setIsCancelado] = useState(pedido_final?.estado === "Cancelado")

    console.log("isCancelado", isCancelado);

    const form = useForm<z.infer<typeof DialogFormScheme>>({
        resolver: zodResolver(DialogFormScheme),
        defaultValues: {
            pedido_final: {
                user_id: pedido_final?.user_id || ObtenerUsuario(pedido_final)?.id,
                tipo_envio: pedido_final?.tipo_envio as "Delivery" | "Retiro en tienda" || "Delivery",
                estado: pedido_final?.estado as "Recibido" | "En preparación" | "En camino" | "Entregado" | "Cancelado" || "Recibido",
                razon_cancelacion: pedido_final?.razon_cancelacion || "",
            },
            pedidos: detalles?.map((detalle) => ({
                pedido_id: detalle.id,
                producto: {
                    id: detalle.producto.id,
                    nombre: detalle.producto.nombre,
                    precio: detalle.producto.precio,
                    categoria_producto: detalle.producto.categoria,
                },
                cantidad: detalle.cantidad,
                precio_final: detalle.precio_final,
                extras: detalle.pedido_extra.map((extra) => ({
                    extra_id: extra.extra?.id || "",
                    extra_nombre: extra.extra?.nombre || "",
                    cantidad: extra.extra?.cantidad || 0,
                    precio_final: extra.extra?.precio || 0,
                }))
            })) || [],
            usuario: {
                id: ObtenerUsuario(pedido_final)?.id,
            },
        },
    })

    function onSubmit(values: z.infer<typeof DialogFormScheme>) {

        const { pedido_final, ...rest } = values
        const pedidoFinal = {
            ...pedido_final,
            razon_cancelacion: pedido_final.razon_cancelacion || undefined,
        }
        const informacion = {
            pedido_final: pedidoFinal,
            pedidos: rest.pedidos,
            usuario: rest.usuario,
        }
        console.log(informacion)
        setIsCancelado(false)
        construirPedido(informacion)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={pedido_final ? "outline" : "default"}
                    size={pedido_final ? "sm" : "default"}
                >
                    {pedido_final ? <Pencil className="mr-2 h-3 w-3" /> : <ShoppingBag className="mr-2 h-3 w-3" />}
                    {pedido_final ? "Editar" : "Nuevo Pedido"}
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col w-11/12 md:w-3/4">
                <DialogHeader>
                    <DialogTitle>{pedido_final ? "Editar Pedido" : "Nuevo Pedido"}</DialogTitle>
                    <DialogDescription>
                        {pedido_final ? "Modifica los detalles del pedido y haz clic en guardar cuando termines." : "Llena los detalles del nuevo pedido y haz clic en guardar cuando termines."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <ScrollArea className="flex flex-col h-[400px] p-4">
                            <FormField
                                control={form.control}
                                name="usuario.id"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-row w-full items-center col-span-3"
                                        {...field}
                                    >
                                        <FormLabel className="w-1/3">Usuario</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un cliente" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem
                                                        value="local"
                                                    >
                                                        <p className="font-semibold">Tienda Barouz</p>
                                                    </SelectItem>
                                                    {usuarios?.map((usuario: UsuarioRow) => (
                                                        <SelectItem
                                                            key={usuario.id}
                                                            value={usuario.id}
                                                        >
                                                            {usuario.nombre}
                                                        </SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pedido_final.tipo_envio"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-row w-full mt-4 items-center col-span-3"
                                        {...field}
                                    >
                                        <FormLabel className="w-1/3">Tipo de envio</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="r1" value="Delivery" />
                                                    <Label htmlFor="r1">Delivery</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem id="r2" value="Retiro en tienda" />
                                                    <Label htmlFor="r2">Retiro en tienda</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pedido_final.estado"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-row w-full mt-4 items-center col-span-3"
                                        {...field}>
                                        <FormLabel className="w-1/3">Estado</FormLabel>
                                        <Select value={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            setIsCancelado(value === "Cancelado")
                                        }}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pedido_final.razon_cancelacion"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-row w-full my-4 items-center col-span-3"
                                        {...field}
                                    >
                                        <FormLabel className="w-1/3">Razón de cancelación</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="razon_cancelacion"
                                                className="max-h-[100px]"
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Motivo de la cancelación"
                                                disabled={!isCancelado}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="pedidos" render={({ field }) => (
                                <GestorPedidos
                                    detalles={field.value}
                                    onChange={field.onChange}
                                />
                            )} />
                        </ScrollArea>
                        <DialogFooter>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        form.reset()
                                        setOpen(false)
                                    }}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Cancelar
                                </Button>
                                <Button onClick={form.handleSubmit(onSubmit)}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Guardar Cambios
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>

                </Form>


            </DialogContent>
        </Dialog>
    )
}
