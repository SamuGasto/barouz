import { useQuery } from "@tanstack/react-query"
import { pedidosService } from "@/services/pedidos"

export const usePedidos = () => {
    return useQuery({
        queryKey: ['pedidos'],
        queryFn: () => pedidosService.obtenerTodosLosPedidos()
    })
}

export const usePedidoPorId = (id: string) => {
    return useQuery({
        queryKey: ['pedido', id],
        queryFn: () => pedidosService.obtenerPedidoPorId(id)
    })
}
