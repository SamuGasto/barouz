import { useMutation, useQuery } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedidos';

type InformacionPedidoFinalCompleto = {
    pedido_final: {
        user_id: string;
        tipo_envio: "Delivery" | "Retiro en tienda";
        estado:
        | "Recibido"
        | "En preparación"
        | "En camino"
        | "Entregado"
        | "Cancelado";
        razon_cancelacion: string | undefined;
    };
    pedidos: {
        pedido_id: string;
        producto: {
            id: string;
            nombre: string;
            precio: number;
        };
        cantidad: number;
        precio_final: number;
        extras: {
            extra_id: string;
            extra_nombre: string;
            cantidad: number;
            precio_final: number;
        }[];
    }[];
    usuario: {
        id: string;
    };
};

function usePedidosFinal() {
    return useQuery({
        queryKey: ["pedidos"],
        queryFn: () => pedidoService.getAllPedidos(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useDatosPedidoFinal(pedido_final_id: string | undefined) {
    return useQuery({
        queryKey: ["pedido", pedido_final_id],
        queryFn: () => pedidoService.obtenerDatosPedido(pedido_final_id!),
        staleTime: 5 * 60 * 1000,
    })
}

export function useDetallePedidosFinal(pedido_final_id: string | undefined) {
    return useQuery({
        queryKey: ["pedido", pedido_final_id],
        queryFn: () => pedidoService.obtenerDetallePedidoFinal(pedido_final_id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!pedido_final_id,
    })
}

// FALTA TERMINAR FUNCION
export function useConstruirPedido() {
    return useMutation({
        mutationFn: (informacion: InformacionPedidoFinalCompleto) => pedidoService.construirPedido(informacion),
    })
}



export default usePedidosFinal