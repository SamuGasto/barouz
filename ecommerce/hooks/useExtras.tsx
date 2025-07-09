import { useQuery } from "@tanstack/react-query"
import { extrasService } from "@/services/extras"
import { CategoriaProductos } from "@/types/resumen-tipos"

export const useExtras = () => {
    return useQuery({
        queryKey: ['extras'],
        queryFn: () => extrasService.obtenerTodosLosExtras()
    })
}

export const useExtraPorId = (id: string) => {
    return useQuery({
        queryKey: ['extra', id],
        queryFn: () => extrasService.obtenerExtraPorId(id)
    })
}

export const useExtrasPorCategoriaProducto = (categoria_producto: CategoriaProductos) => {
    return useQuery({
        queryKey: ['extras', categoria_producto],
        queryFn: () => extrasService.obtenerExtrasPorCategoriaProducto(categoria_producto)
    })
}

export const useCategoriasExtras = () => {
    return useQuery({
        queryKey: ['categorias-extras'],
        queryFn: () => extrasService.obtenerCategoriasExtras()
    })
}
