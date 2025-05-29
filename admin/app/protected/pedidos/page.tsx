import React from 'react'
import Busqueda from '@/components/pedidos/busqueda/busqueda'
import TodosLosPedidos from '@/components/pedidos/tarjetas/todos-los-pedidos'

function Pedidos() {
  return (
    <div className="flex w-full justify-center items-center flex-col gap-10">
      <Busqueda />
      <TodosLosPedidos />
    </div>
  )
}

export default Pedidos