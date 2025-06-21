
import { Database } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { menuService } from '@/services/menu';


type ProductRow = Database["public"]["Tables"]["producto"]["Row"];
type ProductInsert = Database["public"]["Tables"]["producto"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["producto"]["Update"];

export function useProducts() {
    return useQuery<ProductRow[]>({
        queryKey: ["products"],
        queryFn: () => menuService.getAllProducts(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useProductById(id: string | undefined) {
    return useQuery<ProductRow>({
        queryKey: ["product", id],
        queryFn: () => menuService.getProductById(id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    })
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<ProductRow, Error, ProductInsert>({
        mutationFn: menuService.crearProducto,
        onSuccess: (newProduct: ProductRow) => {
            queryClient.setQueryData<ProductRow[]>(['products'], (old) => {
                return old ? [...old, newProduct] : [newProduct]
            })
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => {
            console.error("Error al crear producto: ", error)
        }
    })
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<ProductRow, Error, ProductUpdate>({
        mutationFn: menuService.actualizarProducto,
        onSuccess: (updatedProduct: ProductRow) => {
            queryClient.setQueryData<ProductRow[]>(['products'], (old) => {
                return old ? old.map(product => product.id === updatedProduct.id ? updatedProduct : product) : [updatedProduct]
            })
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => {
            console.error("Error al actualizar producto: ", error)
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: menuService.eliminarProducto,
        onSuccess: (isSuccess, deletedId) => {
            if (isSuccess) {
                queryClient.setQueryData<ProductRow[]>(['products'], (old) => {
                    return old ? old.filter(product => product.id !== deletedId) : []
                })

                queryClient.invalidateQueries({ queryKey: ['products'] })
            }
        },
        onError: (error) => {
            console.error("Error al eliminar producto: ", error)
        }
    })
}

export function useProductsByPedidoId(pedido_id: string | undefined) {
    return useQuery<ProductRow[]>({
        queryKey: ["productsByPedido", pedido_id],
        queryFn: () => menuService.obtenerTodosLosProductosPorPedido(pedido_id!),
        enabled: !!pedido_id,
    })
}

export function usePedidoDetails(pedido_final_id: string | undefined) {
    return useQuery<ProductRow[]>({
        queryKey: ["pedidoDetails", pedido_final_id],
        queryFn: () => menuService.obtenerDetalleProductos(pedido_final_id!),
        enabled: !!pedido_final_id,
    })
}