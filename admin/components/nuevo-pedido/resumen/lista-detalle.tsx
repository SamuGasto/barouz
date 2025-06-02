import React from 'react'
import { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final'
import { Button } from '../../ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface Props {
  pedidos: DetallesSobrePedido[]
}

function ListaDetalle({ pedidos }: Props) {
  if (pedidos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-md">
        No hay productos en el pedido
        <br />
        <span className="text-sm">Haz clic en los productos del menú para agregarlos</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {pedidos.map((item) => (
        <div key={item.producto.id} className="flex items-center justify-between border-b pb-2">
          <div className="flex-1">
            <div className="font-medium">{item.producto.nombre}</div>
            <div className="text-sm text-muted-foreground">${item.producto.precio.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => console.log(item)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center font-medium">{item.cantidad}</span>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => console.log(item)}>
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => console.log(item)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListaDetalle