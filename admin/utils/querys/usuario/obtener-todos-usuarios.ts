import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/types/supabase";

async function obtenerTodosUsuarios(): Promise<
  Database["public"]["Tables"]["usuario"]["Row"][] | null
> {
  const supabase = createClient();

  const { data, error } = await supabase.from("usuario").select("*");

  if (error) {
    console.error("Error al obtener todos los usuarios:", error);
    return null;
  }

  return data;
}

export default obtenerTodosUsuarios;
