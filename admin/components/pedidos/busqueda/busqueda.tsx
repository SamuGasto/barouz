"use client"
import React from 'react'
import InputBusqueda from './input-busqueda'
import FiltroCompletado from './filtro-completado'
import FiltroEstado from './filtro-estado'
import DialogNuevoPedido from '../dialog-nuevo-pedido'

interface Props {
    searchTerm: string
    onSearchChange: (value: string) => void
    activeTab: string
    onTabChange: (value: string) => void
    activeSubTab: string
    onSubTabChange: (value: string) => void
}

function Busqueda({ searchTerm, onSearchChange, activeTab, onTabChange, activeSubTab, onSubTabChange }: Props) {
    return (
        <div className="flex w-full max-w-7xl flex-row justify-between gap-4 px-10">
            <div className="flex flex-col gap-2 w-fit">
                <h1 className="text-3xl font-semibold">Gestión de Pedidos</h1>
                <InputBusqueda searchTerm={searchTerm} onSearchChange={onSearchChange} />
                <FiltroCompletado activeTab={activeTab} onTabChange={onTabChange} />
                <FiltroEstado activeSubTab={activeSubTab} onSubTabChange={onSubTabChange} />
            </div>
            <div>
                <DialogNuevoPedido />
            </div>
        </div>
    )
}

export default Busqueda