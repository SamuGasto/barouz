"use client"
import React from 'react'
import InputBusqueda from './input-busqueda'
import FiltroCompletado from './filtro-completado'
import FiltroEstado from './filtro-estado'
import { Database } from '@/types/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'

interface Props {
    todosUsuarios: Database['public']['Tables']['usuario']['Row'][]
    todosLosProductos: Database['public']['Tables']['producto']['Row'][]
    searchTerm: string
    onSearchChange: (value: string) => void
    activeTab: string
    onTabChange: (value: string) => void
    activeSubTab: string
    onSubTabChange: (value: string) => void
}

function Busqueda({ todosUsuarios, todosLosProductos, searchTerm, onSearchChange, activeTab, onTabChange, activeSubTab, onSubTabChange }: Props) {
    return (
        <div className="flex w-full max-w-7xl flex-row justify-between gap-4 px-10">
            <div className="flex flex-col gap-2 w-fit">
                <h1 className="text-3xl font-semibold">Gestión de Pedidos</h1>
                <InputBusqueda searchTerm={searchTerm} onSearchChange={onSearchChange} />
                <FiltroCompletado activeTab={activeTab} onTabChange={onTabChange} />
                <FiltroEstado activeSubTab={activeSubTab} onSubTabChange={onSubTabChange} />
            </div>
            <div>
                <Link href="/protected/nuevo-pedido">
                    <Button className='flex flex-row items-center gap-2'>
                        <ShoppingBag className="h-5 w-5" />
                        Nuevo Pedido
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Busqueda