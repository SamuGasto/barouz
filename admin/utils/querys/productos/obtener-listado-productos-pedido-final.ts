import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

/**
 * Obtiene el listado de productos y sus cantidades totales asociados a un pedido_final (pedido_id)
 * @param pedido_final_id ID del pedido_final
 * @returns Array con nombre y cantidad_total de cada producto en el pedido_final
 */
export async function obtenerListadoProductosDePedidoFinal(
  pedido_final_id: string,
): Promise<
  { nombre: string; cantidad_total: number; precio_final: number }[] | null
> {
  const supabase = createClient();

  // Consulta: join entre pedido y producto, agrupando por nombre y sumando cantidad
  const { data, error } = await supabase
    .from("pedido")
    .select("producto_id, cantidad, precio_final, producto:producto_id(nombre)")
    .eq("pedido_final_id", pedido_final_id);

  if (error) {
    console.error(
      "Error al obtener listado de productos del pedido_final:",
      error,
    );
    return null;
  }

  return data.map((item) => ({
    nombre: item.producto.nombre ?? "Desconocido",
    cantidad_total: item.cantidad,
    precio_final: item.precio_final,
  }));
}

export default obtenerListadoProductosDePedidoFinal;
