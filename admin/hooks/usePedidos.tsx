import { useQuery } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedidos';

function usePedidos() {
    return useQuery({
        queryKey: ["pedidos"],
        queryFn: () => pedidoService.getAllPedidos(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useDetallePedidos(pedido_final_id: string | undefined) {
    return useQuery({
        queryKey: ["pedido", pedido_final_id],
        queryFn: () => pedidoService.obtenerDetalleProductos(pedido_final_id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!pedido_final_id,
    })
}



export default usePedidos