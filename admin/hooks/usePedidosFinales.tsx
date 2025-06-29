import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GestionarPedidoFinalArgs,
  pedidoFinalService,
} from "@/services/pedidos_finales";
import { TodosLosPedidos } from "@/types/res_pedidos_final";
import { PedidoRow } from "@/types/tipos_supabase_resumidos";
import { Database } from "@/types/supabase";

function usePedidosFinal() {
  return useQuery<TodosLosPedidos[]>({
    queryKey: ["pedidos_finales"],
    queryFn: () => pedidoFinalService.obtenerTodosLosPedidos(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function usePedidosPorPedidoFinal(pedido_final_id: string) {
  return useQuery<PedidoRow[]>({
    queryKey: ["pedidos_finales", pedido_final_id],
    queryFn: () =>
      pedidoFinalService.obtenerPedidosPorPedidoFinal(pedido_final_id),
  });
}

export function useDatosPedidoFinal(pedido_final_id: string) {
  return useQuery({
    queryKey: ["pedidos_finales", pedido_final_id],
    queryFn: () => pedidoFinalService.obtenerDatosPedidoFinal(pedido_final_id),
  });
}

export function useDetallePedidosFinal(pedido_final_id: string) {
  return useQuery({
    queryKey: ["pedidos_finales", pedido_final_id],
    queryFn: () => pedidoFinalService.obtenerDetallePedidoFinal(pedido_final_id),
  });
}

export const useGestionarPedidoFinal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: GestionarPedidoFinalArgs) =>
      pedidoFinalService.gestionarPedidoFinal(variables),
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

export const useEliminarPedidoFinal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pedido_id: string) => pedidoFinalService.eliminarPedidoFinal(pedido_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos_finales"] });
    },
  });
};

export const useCambiarEstadoPedidoFinal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { pedido_final_id: string; estado: Database["public"]["Enums"]["EstadoPedidos"], razon_cancelacion?: string }) => pedidoFinalService.cambiarEstadoPedidoFinal(args.pedido_final_id, args.estado, args.razon_cancelacion),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos_finales"] });
    },
  });
};


export default usePedidosFinal;