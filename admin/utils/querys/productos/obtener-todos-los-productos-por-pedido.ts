import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

async function obtenerTodosLosProductosPorPedido(
  pedido_id: string,
): Promise<Database["public"]["Tables"]["producto"]["Row"][] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("producto")
    .select("*")
    .eq("pedido_id", pedido_id);

  if (error) {
    console.error("Error al obtener datos de la base de productos:", error);
    return [];
  }

  return data;
}

export default obtenerTodosLosProductosPorPedido;
