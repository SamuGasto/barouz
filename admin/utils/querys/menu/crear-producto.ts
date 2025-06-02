import { createClient } from "@/utils/supabase/client";

async function crearProducto(datos: {
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("producto").insert([
    {
      nombre: datos.nombre,
      precio: datos.precio,
      categoria: datos.categoria,
      imagen: datos.imagen,
      descripcion: datos.descripcion,
      disponible: datos.disponible,
    },
  ]).select();

  if (error) {
    console.error("Error al crear producto:", error);
    return null;
  }

  return data;
}

export default crearProducto;
