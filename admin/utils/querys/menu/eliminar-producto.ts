import { createClient } from "@/utils/supabase/client";

async function eliminarProducto(productoId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("producto")
    .delete()
    .eq("id", productoId);

  if (error) {
    console.error("Error al eliminar producto:", error);
    return null;
  }

  return data;
}

export default eliminarProducto;
