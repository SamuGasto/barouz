import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import pedidosService from "@/services/pedidos"
import type { Database } from "@/types/supabase";

type PedidoInsert = Database["public"]["Tables"]["pedido"]["Insert"];
type PedidoUpdate = Database["public"]["Tables"]["pedido"]["Update"];
type ModificarPedidoArgs = {
    pedido_id: string;
    pedido: PedidoUpdate;
}

export function usePedidos() {
    return useQuery({
        queryKey: ["pedidos"],
        queryFn: () => pedidosService.obtenerTodosPedidos(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useProductosPorPedido(pedido_id: string | undefined) {
    return useQuery({
        queryKey: ["pedidos", pedido_id],
        queryFn: () => pedidosService.obtenerTodosLosProductosPorPedido(pedido_id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!pedido_id,
    })
}

export function usePedidosById(pedido_id: string | undefined) {
    return useQuery({
        queryKey: ["pedidos", pedido_id],
        queryFn: () => pedidosService.obtenerPedidoPorId(pedido_id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!pedido_id,
    })
}

export function useCrearPedido(pedido: PedidoInsert) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: pedidosService.crearPedido,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pedidos"] });
        },
    });
}

export function useModificarPedido() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (args: ModificarPedidoArgs) => pedidosService.modificarPedido(args.pedido_id, args.pedido),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pedidos"] });
        },
    });
}

export function useEliminarPedido() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pedido_id: string) => pedidosService.eliminarPedido(pedido_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pedidos"] });
        },
    });
}