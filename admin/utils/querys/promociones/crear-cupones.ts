import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export async function crearCupon(cupon: Omit<Database["public"]["Tables"]["cupon"]["Insert"], "id" | "created_at">): Promise<Database["public"]["Tables"]["cupon"]["Row"] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cupon")
    .insert([cupon])
    .select()
    .single();
  if (error) {
    console.error("Error al crear cupón:", error);
    return null;
  }
  return data;
}
