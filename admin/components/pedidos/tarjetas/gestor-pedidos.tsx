import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useProducts } from '@/hooks/useMenuManagement'
import { useState } from 'react'
import type { Database } from '@/types/supabase'
import { v4 as uuid } from 'uuid'
import DialogExtras from './dialog-extras'

type ProductoRow = Database['public']['Tables']['producto']['Row']
type ExtraRow = Database['public']['Tables']['extra']['Row']

type Detalle = {
    pedido_id: string | null;
    producto: {
        id: string;
        nombre: string;
        precio: number;
        categoria_producto: Database["public"]["Enums"]["CategoriaProducto"];
    };
    cantidad: number;
    precio_final: number;
    extras: {
        extra_id: string;
        extra_nombre: string;
        cantidad: number;
        precio_final: number;
    }[]
}

interface GestorPedidosProps {
    detalles: Detalle[];
    onChange: (value: Detalle[]) => void
}

function GestorPedidos({ detalles, onChange }: GestorPedidosProps) {
    const [id_producto_por_anadir, setProductoPorAnadir] = useState<string>("")
    const { data: todosLosProductos } = useProducts()

    function BuscarProducto(productoId: string): ProductoRow | undefined {
        const productoEncontrado = todosLosProductos?.find((item) => item.id === productoId)
        if (productoEncontrado) {
            return productoEncontrado
        }
    }

    function AnadirProductoPedido() {
        const producto: ProductoRow | undefined = BuscarProducto(id_producto_por_anadir);
        if (producto) {
            const elementoPorAnadir: Detalle = {
                pedido_id: uuid(),
                producto: {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    categoria_producto: producto.categoria,
                },
                cantidad: 1,
                precio_final: producto.precio,
                extras: [],
            }
            onChange([...detalles, elementoPorAnadir]);
            setProductoPorAnadir('');
            console.log("Producto agregado: ", elementoPorAnadir);
        }

    }

    function ModificarPedido(pedidoId: string | null, nuevaCantidad: number) {
    if (!pedidoId) return;
        const nuevosDetalles = detalles.map((detalle) => {
            if (detalle.pedido_id === pedidoId) {
                if (nuevaCantidad < 1) {
                    return detalle;
                }
                const totalExtras = detalle.extras.reduce((total, extra) => total + (extra.precio_final || 0), 0);
                const precioUnitario = detalle.producto.precio + totalExtras;
                const nuevoPrecioFinal = precioUnitario * nuevaCantidad;
                return {
                    ...detalle,
                    cantidad: nuevaCantidad,
                    precio_final: nuevoPrecioFinal,
                };
            }
            return detalle;
        });
        onChange(nuevosDetalles);
        console.log("Pedido modificado: ", nuevosDetalles);
    }

    function EliminarProductoPedido(pedidoId: string | null) {
    if (!pedidoId) return;
        const nuevosDetalles = detalles.filter((detalle) => detalle.pedido_id !== pedidoId)
        onChange(nuevosDetalles)
        console.log("Pedido modificado: ", nuevosDetalles);
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row w-full gap-2 justify-between items-center mb-2">
                <Label className="font-medium">Productos</Label>
                <div className="flex items-center gap-2">
                    <Select value={id_producto_por_anadir} onValueChange={setProductoPorAnadir}>
                        <SelectTrigger className="w-full max-w-[200px]">
                            <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                        <SelectContent>
                            {todosLosProductos?.map((item) => {
                                return (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.nombre} - ${item.precio}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                            AnadirProductoPedido()
                        }}
                        disabled={id_producto_por_anadir === ''}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex w-full border rounded-md">
                {detalles === null ? (
                    <div className="text-center py-4">No hay productos en este pedido</div>
                ) : (
                    <ScrollArea className="flex flex-col w-full">
                        {detalles.map((item) => {
                            return (
                                <div key={item.pedido_id} className="flex flex-col md:flex-row w-full items-center md:justify-between p-3 gap-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="font-medium">{item.producto.nombre}</div>
                                            <div>{item.extras?.map((extra) => (<Badge key={extra.extra_id} className="bg-brand-primary/70">{`${extra.extra_nombre} (x${extra.cantidad})`}</Badge>))}</div>
                                            <DialogExtras
                                                categoria_producto={item.producto.categoria_producto}
                                                extras={item.extras}
                                                onChange={(extras) => {
                                                    const nuevosDetalles = detalles.map((detalle) => {
                                                        if (detalle.pedido_id === item.pedido_id) {
                                                            const precioTotalExtras = extras.reduce((total, extra) => total + (extra.precio_final || 0), 0);
                                                            const precioUnitario = detalle.producto.precio + precioTotalExtras;
                                                            const nuevoPrecioFinal = precioUnitario * detalle.cantidad;
                                                            return {
                                                                ...detalle,
                                                                extras: extras,
                                                                precio_final: nuevoPrecioFinal
                                                            };
                                                        }
                                                        return detalle;
                                                    });
                                                    onChange(nuevosDetalles)
                                                }}
                                            />
                                        </div>
                                        <div className="text-sm">${item.precio_final}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (item.pedido_id) ModificarPedido(item.pedido_id, item.cantidad - 1)
                                            }}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-6 text-center font-medium">{item.cantidad}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (item.pedido_id) ModificarPedido(item.pedido_id, item.cantidad + 1)
                                            }}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (item.pedido_id) EliminarProductoPedido(item.pedido_id)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollArea>
                )}
            </div>
        </div>
    )
}

export default GestorPedidos