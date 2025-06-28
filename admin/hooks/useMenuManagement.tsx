
import { Database } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { menuService } from '@/services/menu';
import { storageService } from '@/services/storage';


type ProductRow = Database["public"]["Tables"]["producto"]["Row"];
type ProductInsert = Database["public"]["Tables"]["producto"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["producto"]["Update"];
type PedidoRow = Database["public"]["Tables"]["pedido"]["Row"];

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

    return useMutation<void, Error, string>({
        mutationFn: async (productId: string) => {
            const productsInCache = queryClient.getQueryData<ProductRow[]>(['products'])
            const productToDelete = productsInCache?.find(product => product.id === productId)

            // Si el producto tiene una imagen, intenta eliminarla del storage primero
            if (productToDelete && productToDelete.imagen && productToDelete.imagen !== "") {
                try {
                    await storageService.deleteImage("productos", productToDelete.imagen);
                } catch (storageError) {
                    console.error("No se pudo eliminar la imagen del storage, pero se intentará eliminar el producto de la DB.", storageError);
                    // Opcional: podrías decidir lanzar el error aquí si quieres que la eliminación
                    // del producto falle si la imagen no se puede eliminar.
                    // Por ahora, solo lo logueamos y continuamos.
                }
            }

            // 2. Eliminar el producto de la base de datos
            await menuService.eliminarProducto(productId); // Asegúrate de que menuService tenga este método
        },
        onSuccess: (data, variables) => {
            // Invalidar o actualizar la caché después de la eliminación exitosa
            queryClient.setQueryData<ProductRow[]>(['products'], (old) => {
                return old ? old.filter(p => p.id !== variables) : [];
            });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.error("Error al eliminar producto:", error);
            throw error;
            // ... toast
        }
    })
}

export function usePedidosByPedidoId(pedido_id: string | undefined) {
    return useQuery<PedidoRow[]>({
        queryKey: ["productsByPedido", pedido_id],
        queryFn: () => menuService.obtenerPedidosPorPedidoFinal(pedido_id!),
        enabled: !!pedido_id,
    })
}

export function useProductsByPedidoId(pedido_id: string | undefined) {
    return useQuery<ProductRow[]>({
        queryKey: ["productsByPedido", pedido_id],
        queryFn: () => menuService.obtenerTodosLosProductosPorPedido(pedido_id!),
        enabled: !!pedido_id,
    })
}
