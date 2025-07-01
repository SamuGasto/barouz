import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export async function obtenerMenu(): Promise<
  Database["public"]["Tables"]["producto"]["Row"][] | null
> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .order("categoria", { ascending: true });

    if (error) {
      console.error("Error al obtener productos:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error inesperado al obtener el menú:", error);
    return null;
  }
}

export default obtenerMenu;
