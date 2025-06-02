"use client"

import React from 'react'
import { DollarSign } from 'lucide-react'
import { Database } from '@/types/supabase'
import { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final'
import DialogAnadirProducto from '../dialog-anadir-producto/dialog-anadir-producto'

interface Props {
    item: Database['public']['Tables']['producto']['Row']
    detallesPedido: DetallesSobrePedido[]
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void
}

function TarjetaMenu({ item, detallesPedido, setDetallesPedido }: Props) {
    return (
        <div
            className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors"
        >
            <div>
                <div className="font-medium">{item.nombre}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                    <DollarSign className="h-3 w-3 mr-0.5" />
                    {item.precio.toLocaleString()}
                </div>
            </div>
            <DialogAnadirProducto producto={item} detallesPedido={detallesPedido} setDetallesPedido={setDetallesPedido} />
        </div>
    )
}

export default TarjetaMenu