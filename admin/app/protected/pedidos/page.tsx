"use client"
import React from 'react'
import Busqueda from '@/components/pedidos/busqueda/busqueda'
import { ListaTarjetas } from '@/components/pedidos/tarjetas/lista-tarjetas';
import usePedidos from '@/hooks/usePedidos';
import useUsuarios from '@/hooks/useUsuarios';
import { useProducts } from '@/hooks/useMenuManagement';

function Pedidos() {
  const { pedidoService, loading } = usePedidos();
  const { usuarioService, loading: usuariosLoading } = useUsuarios();
  const { data: products, isLoading: productsLoading } = useProducts();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("activos");
  const [activeSubTab, setActiveSubTab] = React.useState("all");

  return (
    <div className="flex w-full justify-center items-center flex-col gap-10">
      <Busqueda searchTerm={searchTerm}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSearchChange={setSearchTerm}
        onTabChange={setActiveTab}
        onSubTabChange={setActiveSubTab}
        todosUsuarios={usuarioService.usuarios}
        todosLosProductos={products || []}
      />
      <ListaTarjetas searchTerm={searchTerm}
        activeSubTab={activeSubTab}
        pedidos={pedidoService.pedidos}
        type="all"
        onEdit={() => { }}
        onUpdateStatus={() => { }}
        onCancel={() => { }}
        onReactivate={() => { }}
        menu={products || []}
        todosUsuarios={usuarioService.usuarios}
      />
    </div>
  )
}

export default Pedidos