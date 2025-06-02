import React from 'react'
import { Database } from '@/types/supabase'
import obtenerExtras from '@/utils/querys/extras/obtener-extras'
import { ScrollArea } from '@/components/ui/scroll-area';
import { groupBy } from 'lodash';
import { Dictionary } from 'lodash';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final';

interface PropType {
    pedido: Database['public']['Tables']['pedido']['Row'];
    producto: Database['public']['Tables']['producto']['Row'];
    detallesPedido: DetallesSobrePedido[];
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void;
}

const opacity_disabled = "opacity-50";
const opacity_enabled = "opacity-100";

const cursor_disabled = "cursor-default";
const cursor_enabled = "cursor-pointer";

function Extras({ pedido, producto, detallesPedido, setDetallesPedido, detalleId }: PropType & { detalleId: string | null }) {
    const [todosLosExtras, setTodosLosExtras] = React.useState<{
        categoria: string;
        extras: {
            cantidad_actual: number;
            cantidad: number;
            categoria: string;
            "categoria-producto": Database["public"]["Enums"]["CategoriaProducto"];
            created_at: string;
            id: string;
            nombre: string;
            precio: number;
            tipo: Database["public"]["Enums"]["TipoExtra"];
        }[]
        cantidad_total: number
    }[]>([]);



    React.useEffect(() => {
        const fetchExtras = async () => {
            const extras = await obtenerExtras(producto.categoria);

            if (extras) {
                const extras_agrupados = groupBy(extras, extra => extra.categoria)
                const extras_agrupados_con_cantidad_actual = Object.entries(extras_agrupados).map(([categoria, extras]) => {
                    return {
                        categoria,
                        extras: extras.map(extra => ({
                            ...extra,
                            cantidad_actual: 0
                        })),
                        cantidad_total: 0
                    }
                })
                setTodosLosExtras(extras_agrupados_con_cantidad_actual);
            }
        }
        fetchExtras();
    }, [producto.categoria]);

    function ModificarDetalle(extra_objetivo: Database['public']['Tables']['extra']['Row'], nuevaCantidad: number) {
        // Actualizar detallesPedido (sin mutar)
        const nuevoDetalle = detallesPedido.map((detalle) => {
            if (!detalleId || detalle.id !== detalleId) return detalle;
            if (detalle.producto.categoria !== extra_objetivo['categoria-producto']) return detalle;
            // Clonar extras para evitar mutación
            let nuevasExtras = detalle.extras.map(e => ({ ...e }));
            const idx = nuevasExtras.findIndex((extra) => extra.id === extra_objetivo.id);

            if (idx !== -1) {
                // Existe el extra
                const nuevaCantidadTotal = nuevasExtras[idx].cantidad + nuevaCantidad;
                if (nuevaCantidadTotal > 0) {
                    nuevasExtras[idx].cantidad = nuevaCantidadTotal;
                } else {
                    nuevasExtras = nuevasExtras.filter((extra) => extra.id !== extra_objetivo.id);
                }
            } else if (nuevaCantidad > 0) {
                nuevasExtras.push({ ...extra_objetivo, cantidad: nuevaCantidad });
            }
            // Calcular nuevo precio_final
            const sumaExtras = nuevasExtras.reduce((total, extra) => total + (extra.precio * extra.cantidad), 0);
            const precio_final = detalle.cantidad * (detalle.producto.precio + sumaExtras);
            return { ...detalle, extras: nuevasExtras, precio_final };
        });

        // Actualizar todosLosExtras (sin mutar)
        const nuevoTodosLosExtras = todosLosExtras.map((elemento) => {
            if (elemento.categoria !== extra_objetivo.categoria) return elemento;
            // Clonar extras para evitar mutación
            let nuevasExtras = elemento.extras.map(e => ({ ...e }));
            const idx = nuevasExtras.findIndex((extra) => extra.id === extra_objetivo.id);

            if (idx !== -1) {
                // Existe el extra
                nuevasExtras[idx].cantidad = nuevasExtras[idx].cantidad + nuevaCantidad;
                nuevasExtras[idx].cantidad_actual = nuevasExtras[idx].cantidad;

            } else if (nuevaCantidad > 0) {
                nuevasExtras.push({
                    ...extra_objetivo,
                    cantidad_actual: nuevaCantidad,
                    cantidad: nuevaCantidad
                });
            }
            const cantidad_total = nuevasExtras.reduce((total, extra) => total + extra.cantidad, 0);
            return { ...elemento, extras: nuevasExtras, cantidad_total };
        });

        setDetallesPedido(nuevoDetalle);
        setTodosLosExtras(nuevoTodosLosExtras);
    }

    return (
        <ScrollArea className="flex max-h-[280px] w-full flex-col items-center justify-center gap-4">
            {todosLosExtras.map((elemento) => (
                <div key={elemento.categoria}>
                    <p className="text-lg font-semibold">{elemento.categoria}</p>
                    <div className="flex flex-col gap-2">
                        {elemento.extras.map((extra) => (
                            <Card
                                key={extra.nombre}
                                className={
                                    "flex w-fit flex-row items-center gap-3 px-2 py-0 " +
                                    (elemento.cantidad_total >= 2 && extra.cantidad === 0
                                        ? opacity_disabled
                                        : opacity_enabled)
                                }
                            >
                                {extra.tipo === "checkbox" && (
                                    <input
                                        className={
                                            "my-2 h-4 w-4 " +
                                            (elemento.cantidad_total >= 2 && extra.cantidad === 0
                                                ? cursor_disabled
                                                : cursor_enabled)
                                        }
                                        type="checkbox"
                                        disabled={elemento.cantidad_total >= 2 && extra.cantidad === 0}
                                        onChange={(e) => {
                                            const newDetalle = {
                                                ...extra,
                                                cantidad: e.target.checked ? 1 : 0,
                                            };

                                            ModificarDetalle(extra, e.target.checked ? 1 : -1);
                                        }}
                                    />
                                )}
                                <label className="text-left text-sm font-normal">
                                    {extra.nombre}
                                </label>
                                {extra.tipo === "incremental" && (
                                    <div className="flex h-fit w-fit flex-row items-center gap-1 py-0">
                                        <Button
                                            className="h-8 w-8"
                                            disabled={
                                                extra.cantidad === 0 ||
                                                (elemento.cantidad_total >= 2 && extra.cantidad === 0)
                                            }
                                            onClick={() => {
                                                const newDetalle = {
                                                    ...extra,
                                                    cantidad: extra.cantidad - 1,
                                                };

                                                if (newDetalle.cantidad >= 0) {
                                                    ModificarDetalle(extra, -1);
                                                }
                                            }}
                                            variant={"ghost"}
                                        >
                                            -
                                        </Button>
                                        <p>{extra.cantidad}</p>
                                        <Button
                                            className="h-8 w-8"
                                            disabled={
                                                elemento.cantidad_total >= 2 || extra.cantidad === 2
                                            }
                                            onClick={() => {
                                                const newDetalle = {
                                                    ...extra,
                                                    cantidad: extra.cantidad + 1,
                                                };

                                                if (newDetalle.cantidad <= 2) {
                                                    ModificarDetalle(extra, 1);
                                                }
                                            }}
                                            variant={"ghost"}
                                        >
                                            +
                                        </Button>
                                    </div>
                                )}
                                <p className="text-brand-primary text-right text-sm font-normal">
                                    ${extra.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}

export default Extras