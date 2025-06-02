import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export async function editarCupon(id: string, updates: Partial<Database["public"]["Tables"]["cupon"]["Update"]>): Promise<Database["public"]["Tables"]["cupon"]["Row"] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("cupon").update(updates).eq("id", id).select().single();
  if (error) {
    console.error("Error al editar cupón:", error);
    return null;
  }
  return data;
}
