import { createClient } from "../supabase/client";
import { Database } from "@/types/supabase";

async function obtenerPedidos(): Promise<
  Database["public"]["Tables"]["pedido_final"]["Row"][] | null
> {
  const supabase = createClient();

  const { data: pedidos } = await supabase.from("pedido_final").select("*");

  return pedidos;
}

export default obtenerPedidos;
