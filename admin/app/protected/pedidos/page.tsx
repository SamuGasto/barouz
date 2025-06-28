"use client"
import React from 'react'
import Busqueda from '@/components/pedidos/busqueda/busqueda'
import { ListaTarjetas } from '@/components/pedidos/tarjetas/lista-tarjetas';
import useUsuarios from '@/hooks/useUsuarios';
import usePedidosFinal from '@/hooks/usePedidosFinales';
import { Loader2 } from 'lucide-react';

function Pedidos() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("activos");
  const [activeSubTab, setActiveSubTab] = React.useState("all");
  const { data: todosUsuarios, isPending: todosUsuariosPending } = useUsuarios()
  const { data: pedidosFinales, isLoading: pedidosLoading } = usePedidosFinal();

  const isGeneralLoading = pedidosLoading || todosUsuariosPending

  console.log(pedidosFinales)

  return (
    <div className="flex w-full justify-center items-center flex-col gap-10">
      <Busqueda searchTerm={searchTerm}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSearchChange={setSearchTerm}
        onTabChange={setActiveTab}
        onSubTabChange={setActiveSubTab}
        usuarios={todosUsuarios || []}
      />
      {isGeneralLoading ? <Loader2 className="animate-spin" /> : <ListaTarjetas searchTerm={searchTerm}
        pedidosFinales={pedidosFinales || []}
        activeSubTab={activeSubTab}
        type="all"
        onUpdateStatus={() => { }}
        onCancel={() => { }}
        onReactivate={() => { }}
        usuarios={todosUsuarios || []}
      />}
    </div>
  )
}

export default Pedidos