import { createClient } from "@/utils/supabase/server";
import { todas_las_promociones } from "@/data/examples/promociones";
import { Promocion } from "@/data/tipos";

export default async function obtenerTodasLasPromociones(): Promise<
  Promocion[]
> {
  return Promise.resolve(todas_las_promociones);

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
