import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

export async function obtenerCupones(): Promise<Database["public"]["Tables"]["cupon"]["Row"][]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("cupon").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error al obtener cupones:", error);
    return [];
  }
  return data || [];
}

