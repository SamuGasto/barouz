import { useQuery } from "@tanstack/react-query"
import { cuponesService } from "@/services/cupones"

export const useCupones = () => {
    return useQuery({
        queryKey: ['cupones'],
        queryFn: () => cuponesService.obtenerTodosLosCupones()
    })
}

export const useCuponPorId = (id: string) => {
    return useQuery({
        queryKey: ['cupon', id],
        queryFn: () => cuponesService.obtenerCuponPorId(id)
    })
}

