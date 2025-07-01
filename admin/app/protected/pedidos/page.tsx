"use client"
import React from 'react'
import Busqueda from '@/components/pedidos/busqueda/busqueda'
import { ListaTarjetas } from '@/components/pedidos/tarjetas/lista-tarjetas';
import useUsuarios from '@/hooks/useUsuarios';
import usePedidosFinal from '@/hooks/usePedidosFinales';
import { Loader2 } from 'lucide-react';
import { Database } from '@/types/supabase';

function Pedidos() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<'Activos' | 'Completados' | 'Todos'>("Todos");
  const [activeSubTab, setActiveSubTab] = React.useState<'Todos' | Database['public']['Enums']['EstadoPedidos']>("Todos");
  const { data: todosUsuarios, isPending: todosUsuariosPending } = useUsuarios()
  const { data: pedidosFinales, isLoading: pedidosLoading } = usePedidosFinal();

  const isGeneralLoading = pedidosLoading || todosUsuariosPending


  return (
    <div className="flex w-full justify-center items-center flex-col gap-10">
      <Busqueda searchTerm={searchTerm}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSearchChange={setSearchTerm}
        onTabChange={(value) => setActiveTab(value as 'Activos' | 'Completados' | 'Todos')}
        onSubTabChange={(value) => setActiveSubTab(value as 'Todos' | Database['public']['Enums']['EstadoPedidos'])}
        usuarios={todosUsuarios || []}
      />
      {isGeneralLoading ? <Loader2 className="animate-spin" /> : <div className='flex w-full justify-center items-center'>
        <ListaTarjetas searchTerm={searchTerm}
          pedidosFinales={pedidosFinales || []}
          activeSubTab={activeSubTab}
          type={activeTab}
          usuarios={todosUsuarios || []}
        /></div>}
    </div>
  )
}

export default Pedidos