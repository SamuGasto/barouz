"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Input } from '../../ui/input'
import { Search } from 'lucide-react'
import MenuCategoriasTabs from './menu-categorias-tabs'
import { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final'
import type { Database } from '@/types/supabase'

interface Props {
    menu: Database['public']['Tables']['producto']['Row'][]
    searchTerm: string
    onSearchChange: (searchTerm: string) => void
    detallesPedido: DetallesSobrePedido[]
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void
}

function SeccionMenu({
    menu,
    searchTerm,
    onSearchChange,
    detallesPedido,
    setDetallesPedido,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Menú</CardTitle>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar productos..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <MenuCategoriasTabs menu={menu} detallesPedido={detallesPedido} setDetallesPedido={setDetallesPedido} />
            </CardContent>
        </Card>
    )
}

export default SeccionMenu