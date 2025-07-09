import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cuponesService } from "@/services/cupones";
import type { Database } from "@/types/supabase";

type CuponInsert = Database["public"]["Tables"]["cupon"]["Insert"];
type CuponUpdate = Database["public"]["Tables"]["cupon"]["Update"];
type CuponRow = Database["public"]["Tables"]["cupon"]["Row"];

export function useCupones() {
    return useQuery({
        queryKey: ["cupones"],
        queryFn: () => cuponesService.obtenerTodosLosCupones(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useCuponPorId(id: string) {
    return useQuery({
        queryKey: ["cupon", id],
        queryFn: () => cuponesService.obtenerCuponPorId(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    })
}

export function useCrearCupon() {
    const queryClient = useQueryClient();

    return useMutation<CuponRow, Error, CuponInsert>({
        mutationFn: cuponesService.crearCupon,
        onSuccess: (cupon: CuponRow) => {
            queryClient.setQueryData<CuponRow[]>(["cupones"], (old) => {
                return old ? [...old, cupon] : [cupon]
            })
            queryClient.invalidateQueries({ queryKey: ["cupones"] })
        },
        onError: (error) => {
            console.error("Error al crear cupon:", error)
        }
    })
}

export function useEditarCupon() {
    const queryClient = useQueryClient();

    return useMutation<CuponRow, Error, CuponUpdate>({
        mutationFn: cuponesService.editarCupon,
        onSuccess: (cupon: CuponRow) => {
            queryClient.setQueryData<CuponRow[]>(["cupones"], (old) => {
                return old ? old.map(c => c.id === cupon.id ? cupon : c) : [cupon]
            })
            queryClient.invalidateQueries({ queryKey: ["cupones"] })
        },
        onError: (error) => {
            console.error("Error al editar cupon:", error)
        }
    })
}

export function useEliminarCupon() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: async (id: string) => {
            const cuponVinculatedToPedidoFinal = await cuponesService.checkIfCuponVinculatedToPedidoFinal(id);
            if (cuponVinculatedToPedidoFinal.length > 0) {
                throw new Error("El cupon no se puede eliminar porque esta siendo utilizado en un pedido final");
            }
            return cuponesService.eliminarCupon(id);
        },
        onSuccess: (response: boolean) => {
            queryClient.invalidateQueries({ queryKey: ["cupones"] })
        },
        onError: (error) => {
            console.error("Error al eliminar cupon:", error)
        }
    })
}

