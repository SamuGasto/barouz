"use client"
import React from 'react'
import InputBusqueda from './input-busqueda'
import FiltroCompletado from './filtro-completado'
import FiltroEstado from './filtro-estado'
import { DialogPedido } from '../tarjetas/dialog-pedido'
import { Tables } from '@/types/supabase'

interface Props {
    usuarios: Tables<'usuario'>[]
    searchTerm: string
    onSearchChange: (value: string) => void
    activeTab: string
    onTabChange: (value: string) => void
    activeSubTab: string
    onSubTabChange: (value: string) => void
}

function Busqueda({ searchTerm, onSearchChange, activeTab, onTabChange, activeSubTab, onSubTabChange, usuarios }: Props) {
    return (
        <div className="flex w-full max-w-7xl flex-col md:flex-row items-center justify-center md:justify-between gap-4 px-10">
            <div className="flex flex-col gap-2 w-fit md:justify-start justify-center items-center md:items-start">
                <h1 className="text-3xl font-semibold">Gestión de Pedidos</h1>
                <InputBusqueda searchTerm={searchTerm} onSearchChange={onSearchChange} />
                <FiltroCompletado activeTab={activeTab} onTabChange={onTabChange} />
                <FiltroEstado activeSubTab={activeSubTab} onSubTabChange={onSubTabChange} />
            </div>
            <div className='order-first md:order-last'>
                <DialogPedido
                    pedido_final={undefined}
                    detalles={undefined}
                    usuarios={usuarios}
                />
            </div>
        </div>
    )
}

export default Busqueda