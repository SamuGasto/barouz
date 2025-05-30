import { createClient } from "@/utils/supabase/client";

async function obtenerProductoViaId(id: string) {
  const supabase = createClient();

  const { data: producto, error } = await supabase
    .from("producto")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }

  return producto;
}

export default obtenerProductoViaId;
