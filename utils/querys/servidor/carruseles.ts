import {
  ofertas_carrusel_principal,
  ofertas_carrusel_ofertas,
} from "@/data/examples/ofertas-carousel";
import { createClient } from "@/utils/supabase/server";
import { Oferta } from "@/data/tipos";

export async function obtenerCarruselPrincipal(): Promise<Oferta[]> {
  return Promise.resolve(ofertas_carrusel_principal);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("oferta_carrusel")
    .select("oferta(*)")
    .eq("carrusel_id", process.env.ID_CARRUSEL_PRINCIPAL);

  if (error) {
    console.error("Error al obtener el carrusel principal:", error);
    return [];
  }

  //return data;
}

export async function obtenerCarruselOfertas(): Promise<Oferta[]> {
  return Promise.resolve(ofertas_carrusel_ofertas);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("oferta_carrusel")
    .select("oferta(*)")
    .eq("carrusel_id", process.env.ID_CARRUSEL_OFERTAS);

  if (error) {
    console.error("Error al obtener el carrusel de ofertas:", error);
    return [];
  }

  if (!data) {
    return [];
  }

  //return data;
}
