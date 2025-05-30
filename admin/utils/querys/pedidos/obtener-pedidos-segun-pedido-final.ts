import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export type DetallesSobrePedido = {
  producto: Database["public"]["Tables"]["producto"]["Row"];
  extras: Database["public"]["Tables"]["extra"]["Row"][];
  cantidad: number;
  precio_final: number;
};

async function obtenerPedidosSegunPedidoFinal(
  pedido_final_id: string,
): Promise<DetallesSobrePedido[] | null> {
  const supabase = createClient();

  // Usamos join para traer producto y extras relacionados
  const { data, error } = await supabase
    .from("pedido")
    .select(
      `
      id,
      cantidad,
      precio_final,
      producto:producto_id(*),
      pedido_extra:pedido_extra(id, extra:extra_id(*))
    `,
    )
    .eq("pedido_final_id", pedido_final_id);

  if (error || !data) {
    console.error("Error al obtener pedidos:", error);
    return null;
  }

  // Adaptamos la respuesta a la interface esperada
  const respuesta: DetallesSobrePedido[] = data.map((pedido: any) => ({
    producto: pedido.producto,
    extras: (pedido.pedido_extra || []).map((pe: any) => pe.extra),
    cantidad: pedido.cantidad,
    precio_final: pedido.precio_final,
  }));

  return respuesta;
}

export default obtenerPedidosSegunPedidoFinal;
