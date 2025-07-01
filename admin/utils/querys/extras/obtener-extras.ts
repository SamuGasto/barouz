import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

async function obtenerExtras(
  categoria: Database['public']['Enums']['CategoriaProducto'],
): Promise<Database["public"]["Tables"]["extra"]["Row"][] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("extra")
    .select("*")
    .eq("categoria-producto", categoria);
  if (error) {
    console.error("Error al obtener extras:", error);
    return null;
  }
  return data;
}

export default obtenerExtras;
