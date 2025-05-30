"use client"
import { Card } from '@/components/ui/card'
import React from 'react'
import obtenerPedidos from '@/utils/querys/pedidos/obtener-pedidos-finales'
import { Database } from '@/types/supabase';
import { TarjetaPedido } from './tarjeta-pedido';

interface Props {
    searchTerm: string
    activeTab: string
    activeSubTab: string
}

function TodosLosPedidos({ searchTerm, activeTab, activeSubTab }: Props) {
    const [pedidos, setPedidos] = React.useState<Database['public']['Tables']['pedido_final']['Row'][]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getData = async () => {
            const pedidos = await obtenerPedidos();
            setPedidos(pedidos != null ? pedidos : []);
            setLoading(false);
        }
        getData();
    }, []);

    if (loading) {
        return (
            <Card className="flex w-full max-w-7xl">
                <h2 className="text-xl font-semibold">Cargando...</h2>
            </Card>
        )
    }

    return (
        <Card className="flex w-full max-w-7xl flex-col gap-2">
            {pedidos.map((pedido) => (
                <TarjetaPedido key={pedido.id} pedido={pedido} onEdit={() => { }} onUpdateStatus={() => { }} />
            ))}
        </Card>
    )
}

export default TodosLosPedidos