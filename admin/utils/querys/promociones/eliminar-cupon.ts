import { createClient } from "@/utils/supabase/client";

export async function eliminarCupon(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from("cupon").delete().eq("id", id);
  if (error) {
    console.error("Error al eliminar cupón:", error);
    return false;
  }
  return true;
}
