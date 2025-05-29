import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Database } from '@/types/supabase'
import React from 'react'
import obtenerDetalleProductos from '@/utils/querys/obtener-detalle-productos'
import { Button } from '@/components/ui/button'

interface PropType {
    pedido: Database['public']['Tables']['pedido_final']['Row']
}

const estados: Record<Database['public']['Enums']['EstadoPedidos'], { color: string, texto: string }> = {
    'Recibido': {
        color: 'bg-brand-background-1',
        texto: 'Iniciar Preparación'
    },
    'En preparación': {
        color: 'bg-brand-background-2',
        texto: 'Marcar como listo'
    },
    'En camino': {
        color: 'bg-brand-background-3',
        texto: 'Marcar como entregado'
    },
    'Entregado': {
        color: 'bg-brand-background-4',
        texto: 'Marcar como entregado'
    }
}

async function TarjetaPedido({ pedido }: PropType) {
    const [data, setData] = React.useState<Database['public']['Tables']['pedido']['Row'][]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getData = async () => {
            const detalleProductos = await obtenerDetalleProductos(pedido.id);
            setData(detalleProductos != null ? detalleProductos : []);
            setLoading(false);
        }
        getData();
    }, [pedido.id]);

    if (loading) {
        return (
            <Card className="w-full">
                <h2 className="text-xl font-semibold">Cargando...</h2>
            </Card>
        )
    }


    return (
        <Card className="w-full">
            <CardHeader className='flex justify-between items-center'>
                <div>
                    <h2 className="text-xl font-semibold">{pedido.id}</h2>
                    <p className="text-sm text-muted-foreground">{pedido.created_at}</p>
                </div>
                <Badge>
                    {pedido.estado}
                </Badge>
            </CardHeader>
            <CardContent className="flex border flex-col gap-2">
                {data.map((item) => (
                    <div key={item.id}>
                        <h2>{item.producto_id}</h2>
                        <p>{item.cantidad}</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter className='flex flex-row gap-4 justify-end items-center'>
                <Button variant="outline">Imprimir</Button>
                <Button variant='outline'>Editar</Button>
                <Button className={estados[pedido.estado].color}>{estados[pedido.estado].texto}</Button>
            </CardFooter>
        </Card>
    )
}

export default TarjetaPedido