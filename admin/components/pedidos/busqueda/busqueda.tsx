import React from 'react'
import InputBusqueda from './input-busqueda'
import FiltroCompletado from './filtro-completado'
import FiltroEstado from './filtro-estado'
import DialogNuevoPedido from '../dialog-nuevo-pedido'

function Busqueda() {
    return (
        <div className="flex w-full max-w-7xl flex-row justify-between gap-4 px-10">
            <div className="flex flex-col gap-2 w-fit">
                <h1 className="text-3xl font-semibold">Gestión de Pedidos</h1>
                <InputBusqueda />
                <FiltroCompletado />
                <FiltroEstado />
            </div>
            <div>
                <DialogNuevoPedido />
            </div>
        </div>
    )
}

export default Busqueda