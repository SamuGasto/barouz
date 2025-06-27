import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useExtrasPorCategoriaProducto } from '@/hooks/useExtras'
import { Database, Tables } from '@/types/supabase'
import { Loader2, Minus, Plus } from 'lucide-react'
import React from 'react'

interface IDialogExtras {
    categoria_producto: Database["public"]["Enums"]["CategoriaProducto"]
    extras: {
        extra_id: string,
        extra_nombre: string,
        cantidad: number,
        precio_final: number,
    }[]
    onChange: (extras: IDialogExtras['extras']) => void
}

type CantidadesLocales = {
    id: string,
    nombre: string,
    precio: number,
    cantidad: number
}

interface ICantidadesPorCategoria {
    categoria: string,
    cantidad_total: number,
    cantidades: CantidadesLocales[]
}

function DialogExtras({ categoria_producto, extras, onChange }: IDialogExtras) {
    const [open, setOpen] = React.useState(false)
    const { data: extrasValidos, isPending: isLoading } = useExtrasPorCategoriaProducto(categoria_producto)
    const [cantidadesPorCategoria, setCantidadesPorCategoria] = React.useState<ICantidadesPorCategoria[]>(
        []
    )

    function inicializarCantidadesPorCategoria() {
        const cantidades: ICantidadesPorCategoria[] = extrasValidos?.categorias.map((categoria) => {
            const extras_asociados = extrasValidos?.extras.filter((extra) => extra.categoria === categoria);
            const cantidades_finales = extras_asociados?.map((extra) => {
                // Busca si este extra ya está en los seleccionados
                const extraSeleccionado = extras.find(e => e.extra_id === extra.id);

                return {
                    id: extra.id,
                    nombre: extra.nombre,
                    precio: extra.precio,
                    cantidad: extraSeleccionado ? 1 : 0
                }
            }) || [];
            const cantidad_total = cantidades_finales.reduce((total, extra) => total + extra.cantidad, 0);
            return { categoria, cantidad_total, cantidades: cantidades_finales };
        }) || [];

        setCantidadesPorCategoria(cantidades);
    }

    React.useEffect(() => {
        inicializarCantidadesPorCategoria()
    }, [extrasValidos, extras])

    const handleModificarExtra = (categoria: string, extra_id: string, cantidad_a_sumar: number) => {
        const indice_extrasValidos = cantidadesPorCategoria.findIndex((item) => item.categoria === categoria)
        if (indice_extrasValidos === undefined) {
            return
        }

        const extra_en_HUD = cantidadesPorCategoria[indice_extrasValidos]?.cantidades.find((item) => item.id === extra_id)
        const extras_en_categoria = cantidadesPorCategoria[indice_extrasValidos]?.cantidad_total

        if (extra_en_HUD === undefined) {
            return
        }

        if (extras_en_categoria + cantidad_a_sumar > 2 || extras_en_categoria + cantidad_a_sumar < 0) {
            return
        }


        const cantidadFinal = () => {
            if (extra_en_HUD.cantidad + cantidad_a_sumar < 0) {
                return 0
            } else if (extra_en_HUD.cantidad + cantidad_a_sumar > 2) {
                return 2
            }
            else {

                return extra_en_HUD.cantidad + cantidad_a_sumar
            }
        }



        const cant_final = cantidadFinal()

        const nuevasCantidadesPorCategoria: ICantidadesPorCategoria[] = cantidadesPorCategoria.map((item) => item.categoria === categoria ? { ...item, cantidades: item.cantidades.map((extra_interior) => extra_interior.id === extra_id ? { ...extra_interior, cantidad: cant_final } : extra_interior) } : item)
        const recuento_final = nuevasCantidadesPorCategoria.map((item) => {
            if (item.categoria === categoria) {
                const nueva_cantidad_total = item.cantidades.reduce((total, extra) => total + extra.cantidad, 0)
                return { ...item, cantidad_total: nueva_cantidad_total }
            }
            return item
        })
        const actualizacionFinal = recuento_final

        setCantidadesPorCategoria(actualizacionFinal)

        const nuevosExtras: IDialogExtras['extras'] = []
        actualizacionFinal.map((item) => {
            item.cantidades.map((extra) => {
                if (extra.cantidad === 0) {
                    return
                }
                const res = {
                    extra_id: extra.id,
                    extra_nombre: extra.nombre,
                    cantidad: extra.cantidad,
                    precio_final: extra.precio * extra.cantidad,
                }
                nuevosExtras.push(res)
            })
        })

        onChange(nuevosExtras)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Badge className='hover:cursor-pointer' variant={'secondary'}>
                    <Plus className="mr-2 h-4 w-4" />
                    Extra
                </Badge>
            </DialogTrigger>
            <DialogContent className='md:w-2/5'>
                <DialogHeader>
                    <DialogTitle>Agregar extra</DialogTitle>
                    <DialogDescription>
                        Agrega un extra al pedido
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[400px]">
                    {isLoading && <Loader2 className="animate-spin" />}
                    <div className="flex flex-col gap-6">
                        {cantidadesPorCategoria?.map((categoria) => (
                            <div key={categoria.categoria}>
                                <p className='text-lg font-semibold'>{categoria.categoria}</p>
                                <div className="flex flex-col gap-2 items-start">
                                    {categoria.cantidades.map((extra) => (
                                        <div key={extra.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="default">
                                                    {`${extra.nombre} - $${extra.precio}`}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button className='h-6 w-6' variant="outline" size={'icon'} onClick={() => handleModificarExtra(categoria.categoria, extra.id, -1)}>
                                                    <Minus className="h-2 w-2" />
                                                </Button>
                                                <span className="w-6 text-center font-medium">{extra.cantidad}</span>
                                                <Button className='h-6 w-6' variant="outline" size={'icon'} onClick={() => handleModificarExtra(categoria.categoria, extra.id, 1)}>
                                                    <Plus className="h-2 w-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default DialogExtras