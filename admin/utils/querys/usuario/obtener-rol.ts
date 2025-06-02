import { createClient } from "@/utils/supabase/server";

async function obtenerRol(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("rol").select("*").eq("id", id);

  if (error) {
    console.error("Error al obtener rol:", error);
    return null;
  }

  return data[0];
}

export default obtenerRol;
