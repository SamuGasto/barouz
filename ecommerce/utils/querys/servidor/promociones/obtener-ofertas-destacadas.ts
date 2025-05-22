import { createClient } from "@/utils/supabase/server";
import { Producto } from "@/data/tipos";
import promociones from "@/data/examples/promociones";

export async function obtenerPromocionesDestacadas(): Promise<Producto[]> {
  return Promise.resolve(promociones);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("producto_ubicacion")
    .select("productos(*)")
    .eq("ubicacion_id", process.env.ID_UBICACION_OFERTAS_DESTACADAS);

  if (error) {
    console.error("Error al obtener las ofertas destacadas:", error);
    return [];
  }

  if (!data) {
    return [];
  }

  //return data;
}
