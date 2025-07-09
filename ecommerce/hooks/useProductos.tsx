import { useQuery } from '@tanstack/react-query'
import { productosService } from '@/services/productos'
import { CategoriaProductos } from '@/types/resumen-tipos'

export const useProductos = () => {
    return useQuery({
        queryKey: ['productos'],
        queryFn: () => productosService.obtenerTodosLosProductos()
    })
}

export const useProductoPorId = (id: string) => {
    return useQuery({
        queryKey: ['producto', id],
        queryFn: () => productosService.obtenerProductoPorId(id)
    })
}

export const useProductosPorCategoria = (categoria: CategoriaProductos) => {
    return useQuery({
        queryKey: ['productos', categoria],
        queryFn: () => productosService.obtenerProductosPorCategoria(categoria)
    })
}
