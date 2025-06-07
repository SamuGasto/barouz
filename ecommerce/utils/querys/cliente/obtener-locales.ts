import { createClient } from "@/utils/supabase/client";
import { Local } from "@/data/tipos";
import locales from "@/data/examples/locales";

export async function obtenerLocales(): Promise<Local[]> {
  return Promise.resolve(locales);

  const supabase = await createClient();
  const { data, error } = await supabase.from("local").select("*");

  if (error) {
    console.error("Error al obtener los locales:", error);
    return [];
  }

  //return data;
}
