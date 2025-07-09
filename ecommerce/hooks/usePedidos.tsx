import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CrearNuevoPedidoCompletoArgs, pedidosService } from "@/services/pedidos"


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

export const useGestionarPedidoFinal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: CrearNuevoPedidoCompletoArgs) =>
            pedidosService.crearNuevoPedidoCompleto(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pedidos_finales"],
            });
        },
        onError: (error) => {
            console.error("Error al gestionar el pedido final:", error);
        },
    });
};