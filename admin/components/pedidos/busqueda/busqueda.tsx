"use client"
import React from 'react'
import InputBusqueda from './input-busqueda'
import FiltroCompletado from './filtro-completado'
import FiltroEstado from './filtro-estado'
import { DialogPedido } from '../tarjetas/dialog-pedido'
import { Tables } from '@/types/supabase'
import { Database } from '@/types/supabase'

interface Props {
    usuarios: Tables<'usuario'>[]
    searchTerm: string
    onSearchChange: (value: string) => void
    activeTab: 'Activos' | 'Completados' | 'Todos'
    onTabChange: (value: 'Activos' | 'Completados' | 'Todos') => void
    activeSubTab: 'Todos' | Database['public']['Enums']['EstadoPedidos']
    onSubTabChange: (value: 'Todos' | Database['public']['Enums']['EstadoPedidos']) => void
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
            <div className='order-first md:order-last w-full md:w-auto'>
                <DialogPedido
                    pedido_final_arg={undefined}
                    usuarios={usuarios}
                    className="w-full md:w-auto bg-brand-primary hover:bg-brand-primary/90 text-brand-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    <span className="font-semibold">+ Nuevo Pedido</span>
                </DialogPedido>
            </div>
        </div>
    )
}

export default Busqueda