import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

async function editarProducto(
  productoId: string,
  modificaciones: Database["public"]["Tables"]["producto"]["Update"]
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("producto")
    .update(modificaciones)
    .eq("id", productoId)
    .select();

  if (error) {
    console.error("Error al editar producto:", error);
    return null;
  }

  return data;
}

export default editarProducto;
