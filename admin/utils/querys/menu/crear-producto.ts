import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import { ProductoInsert } from "@/types/tipos_supabase_resumidos";

type CategoriaProducto = Database['public']['Enums']['CategoriaProducto'];

interface CrearProductoParams {
  nombre: string;
  precio: number;
  categoria: CategoriaProducto;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

export async function crearProducto(
  datos: CrearProductoParams
): Promise<Database["public"]["Tables"]["producto"]["Row"] | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("producto")
      .insert([{
        nombre: datos.nombre,
        precio: datos.precio,
        categoria: datos.categoria,
        imagen: datos.imagen,
        descripcion: datos.descripcion,
        disponible: datos.disponible,
      } as ProductoInsert])
      .select()
      .single();

    if (error) {
      console.error("Error al crear producto:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error inesperado al crear producto:", error);
    return null;
  }
}

export default crearProducto;
