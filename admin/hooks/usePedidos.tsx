import React from 'react'
import PedidoService from '@/services/pedidos';

function usePedidos() {
    const [pedidoService, setPedidoService] = React.useState(new PedidoService())
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const getData = async () => {
            await pedidoService.cargarPedidos().then(() => setLoading(false))
        }
        getData()
    }, [])

    return { pedidoService, loading }
}

export default usePedidos