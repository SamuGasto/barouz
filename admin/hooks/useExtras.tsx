import extraService from "@/services/extras";
import { Database } from "@/types/supabase";
import { ExtraInsert, ExtraUpdate } from "@/types/tipos_supabase_resumidos";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useTodosLosExtras() {
    return useQuery({
        queryKey: ["extras"],
        queryFn: () => extraService.obtenerTodosLosExtras(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useExtrasPorPedido(pedido_id: string) {
    return useQuery({
        queryKey: ["extras", pedido_id],
        queryFn: () => extraService.obtenerExtrasPorPedido(pedido_id),
        staleTime: 5 * 60 * 1000,
    })
}

export function useExtrasPorCategoriaProducto(categoria: Database["public"]["Enums"]["CategoriaProducto"]) {
    return useQuery({
        queryKey: ["extras", categoria],
        queryFn: () => extraService.obtenerExtrasPorCategoriaProducto(categoria),
        staleTime: 5 * 60 * 1000,
    })
}

export function useCrearExtra(extra: ExtraInsert) {
    return useMutation({
        mutationFn: () => extraService.crearExtra(extra),
    })
}

export function useActualizarExtra(extra: ExtraUpdate) {
    return useMutation({
        mutationFn: () => extraService.actualizarExtra(extra),
    })
}

export function useEliminarExtra(id: string) {
    return useMutation({
        mutationFn: () => extraService.eliminarExtra(id),
    })
}
