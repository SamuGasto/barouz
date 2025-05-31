import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

async function obtenerDatosUsuario(
  id_pedido_final: string,
): Promise<Database["public"]["Tables"]["usuario"]["Row"] | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id", id_pedido_final);

  if (error) {
    console.error("Error al obtener datos de usuario:", error);
    return null;
  }

  return data[0];
}

export default obtenerDatosUsuario;
