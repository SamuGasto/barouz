import { createClient } from "@/utils/supabase/server";

async function eliminarUsuario(id: string) {
  const supabase = await createClient();

  const { error: errorAuth } = await supabase.auth.admin.deleteUser(id);

  if (errorAuth) {
    console.error("Error al eliminar usuario:", errorAuth);
    return null;
  }

  const { error } = await supabase.from("usuario").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar usuario:", error);
    return null;
  }

  return true;
}

export default eliminarUsuario;
