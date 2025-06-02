import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

async function obtenerMenu(): Promise<
  Database["public"]["Tables"]["producto"]["Row"][] | null
> {
  const supabase = createClient();

  const { data, error } = await supabase.from("producto").select("*");

  if (error) {
    console.error("Error al obtener productos:", error);
    return null;
  }

  return data;
}

export default obtenerMenu;
