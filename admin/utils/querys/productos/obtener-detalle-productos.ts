import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

const obtenerDetalleProductos = async (
  id_pedido_final: string,
): Promise<Database["public"]["Tables"]["pedido"]["Row"][] | null> => {
  const supabase = await createClient();

  const { data: detalle_productos } = await supabase
    .from("pedido")
    .select("*")
    .eq("pedido_final_id", id_pedido_final);

  return detalle_productos;
};

export default obtenerDetalleProductos;
