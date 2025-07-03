import { useQuery } from "@tanstack/react-query"
import { pedidosService } from "@/services/pedidos"

export const usePedidos = <T = any>() => {
    return useQuery<T>({
        queryKey: ['pedidos'],
        queryFn: () => pedidosService.obtenerTodosLosPedidos() as unknown as T
    })
}

export const usePedidoPorId = <T = any>(id: string) => {
    return useQuery<T>({
        queryKey: ['pedido', id],
        queryFn: () => pedidosService.obtenerPedidoPorId(id) as unknown as T
    })
}
