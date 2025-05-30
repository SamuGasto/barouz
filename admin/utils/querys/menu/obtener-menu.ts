import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

export interface Menu {
  productos: Database["public"]["Tables"]["producto"]["Row"][];
}

async function obtenerMenu(): Promise<Menu | null> {
  const supabase = createClient();

  const { data, error } = await supabase.from("producto").select("*");

  if (error) {
    console.error("Error al obtener productos:", error);
    return null;
  }

  return { productos: data };
}

export default obtenerMenu;
