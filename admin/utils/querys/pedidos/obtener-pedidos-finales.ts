import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

async function obtenerPedidos(): Promise<
  Database["public"]["Tables"]["pedido_final"]["Row"][] | null
> {
  const supabase = createClient();

  const { data, error } = await supabase.from("pedido_final").select("*");

  if (error) {
    console.error("Error al obtener pedidos:", error);
    return null;
  }

  return data;
}

export default obtenerPedidos;
