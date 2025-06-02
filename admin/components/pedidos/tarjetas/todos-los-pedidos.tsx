"use client"
import { Card } from '@/components/ui/card'
import React from 'react'
import obtenerPedidos from '@/utils/querys/pedidos/obtener-pedidos-finales'
import obtenerMenu from '@/utils/querys/menu/obtener-menu'
import { Database } from '@/types/supabase';
import { TarjetaPedido } from './tarjeta-pedido';
import obtenerTodosUsuarios from '@/utils/querys/usuario/obtener-todos-usuarios'

interface Props {
    searchTerm: string
    activeTab: string
    activeSubTab: string
}

function TodosLosPedidos({ searchTerm, activeTab, activeSubTab }: Props) {
    const [pedidos, setPedidos] = React.useState<Database['public']['Tables']['pedido_final']['Row'][]>([]);
    const [loading, setLoading] = React.useState(true);
    const [menu, setMenu] = React.useState<Database['public']['Tables']['producto']['Row'][]>([]);
    const [todosUsuarios, setTodosUsuarios] = React.useState<Database['public']['Tables']['usuario']['Row'][]>([]);

    React.useEffect(() => {
        const getData = async () => {
            const pedidos = await obtenerPedidos();
            setPedidos(pedidos != null ? pedidos : []);
            const menu = await obtenerMenu();
            setMenu(menu != null ? menu : []);
            const todosUsuarios = await obtenerTodosUsuarios();
            setTodosUsuarios(todosUsuarios != null ? todosUsuarios : []);
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
                <TarjetaPedido key={pedido.id} pedido={pedido} onEdit={() => { }} onUpdateStatus={() => { }} menu={menu} todosUsuarios={todosUsuarios} />
            ))}
        </Card>
    )
}

export default TodosLosPedidos