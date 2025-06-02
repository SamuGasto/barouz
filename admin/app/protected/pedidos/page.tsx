"use client"
import React from 'react'
import Busqueda from '@/components/pedidos/busqueda/busqueda'
import { ListaTarjetas } from '@/components/pedidos/tarjetas/lista-tarjetas';
import obtenerPedidos from '@/utils/querys/pedidos/obtener-pedidos-finales';
import type { Database } from '@/types/supabase';
import obtenerMenu from '@/utils/querys/menu/obtener-menu';
import obtenerTodosUsuarios from '@/utils/querys/usuario/obtener-todos-usuarios';

function Pedidos() {
  const [pedidos, setPedidos] = React.useState<Database['public']['Tables']['pedido_final']['Row'][]>([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("activos");
  const [activeSubTab, setActiveSubTab] = React.useState("all");
  const [menu, setMenu] = React.useState<Database['public']['Tables']['producto']['Row'][]>([]);
  const [usuarios, setUsuarios] = React.useState<Database['public']['Tables']['usuario']['Row'][]>([]);


  React.useEffect(() => {
    const getData = async () => {
      const pedidos = await obtenerPedidos();
      const menu = await obtenerMenu();
      const usuarios = await obtenerTodosUsuarios();
      setPedidos(pedidos != null ? pedidos : []);
      setMenu(menu != null ? menu : []);
      setUsuarios(usuarios != null ? usuarios : []);
    }
    getData();
  }, []);

  return (
    <div className="flex w-full justify-center items-center flex-col gap-10">
      <Busqueda searchTerm={searchTerm}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSearchChange={setSearchTerm}
        onTabChange={setActiveTab}
        onSubTabChange={setActiveSubTab}
        todosUsuarios={usuarios}
        todosLosProductos={menu}
      />
      <ListaTarjetas searchTerm={searchTerm}
        activeSubTab={activeSubTab}
        pedidos={pedidos}
        type="all"
        onEdit={() => { }}
        onUpdateStatus={() => { }}
        onCancel={() => { }}
        onReactivate={() => { }}
        menu={menu}
        todosUsuarios={usuarios}
      />
    </div>
  )
}

export default Pedidos