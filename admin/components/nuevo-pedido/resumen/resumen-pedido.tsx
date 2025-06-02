import React from 'react'

interface ResumenPedidoProps {
    subtotal: number
    taxRate: number
}
function ResumenPedido({ subtotal, taxRate }: ResumenPedidoProps) {
    const tax = subtotal * taxRate
    const total = subtotal + tax
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span>Impuestos ({(taxRate * 100).toFixed(0)}%)</span>
                <span>${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default ResumenPedido