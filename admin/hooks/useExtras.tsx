import extraService from "@/services/extras";
import { Database } from "@/types/supabase";
import { CategoriaProductos, ExtraInsert, ExtraRow, ExtraUpdate } from "@/types/tipos_supabase_resumidos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useExtrasPorCategoriaProducto(categoria: CategoriaProductos) {
    return useQuery({
        queryKey: ["extras", categoria],
        queryFn: () => extraService.obtenerExtrasPorCategoriaProducto(categoria),
        staleTime: 5 * 60 * 1000,
    })
}

// Create extra
export function useCrearExtra() {
    const queryClient = useQueryClient()

    return useMutation<ExtraRow, Error, ExtraInsert>({
        mutationFn: (nuevoExtra) => extraService.crearExtra(nuevoExtra),
        onSuccess: (nuevoExtra) => {
            // Actualizar caché
            queryClient.setQueryData<ExtraRow[]>(["extras"], (old) =>
                old ? [...old, nuevoExtra] : [nuevoExtra]
            )

            // Invalidar ambas consultas
            queryClient.invalidateQueries({ queryKey: ["extras"] })
            queryClient.invalidateQueries({ queryKey: ["categorias-extras"] })
        }
    })
}

// Update extra
export function useActualizarExtra() {
    const queryClient = useQueryClient()

    return useMutation<ExtraRow, Error, ExtraUpdate>({
        mutationFn: (extraActualizado) => extraService.actualizarExtra(extraActualizado),
        onSuccess: (extraActualizado) => {
            // Actualizar caché de extras
            queryClient.setQueryData<ExtraRow[]>(["extras"], (old) =>
                old?.map((extra) =>
                    extra.id === extraActualizado.id ? { ...extra, ...extraActualizado } : extra
                )
            )

            // Invalidar ambas consultas
            queryClient.invalidateQueries({ queryKey: ["extras"] })
            queryClient.invalidateQueries({ queryKey: ["categorias-extras"] })
        }
    })
}

// Delete extra
export function useEliminarExtra() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => extraService.eliminarExtra(id),
        onSuccess: (_, id) => {
            // Actualizar caché
            queryClient.setQueryData<ExtraRow[]>(["extras"], (old) =>
                old?.filter((extra) => extra.id !== id)
            )

            // Invalidar ambas consultas
            queryClient.invalidateQueries({ queryKey: ["extras"] })
            queryClient.invalidateQueries({ queryKey: ["categorias-extras"] })
        }
    })
}

export function useObtenerCategoriasExtras() {
    return useQuery<string[]>({
        queryKey: ["categorias-extras"],  // Eliminamos "extras" de la clave
        queryFn: () => extraService.obtenerCategoriasExtras(),
        staleTime: 5 * 60 * 1000,
    })
}