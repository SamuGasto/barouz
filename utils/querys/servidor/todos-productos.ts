import { Producto } from "@/data/examples/productos-promociones";
import todosLosProductos from "@/data/examples/todos-productos";
import { createClient } from "@/utils/supabase/server";

async function obtenerTodosLosProductos(): Promise<Producto[]> {
  return Promise.resolve(todosLosProductos);

  const supabase = await createClient();
  const { data: productos } = await supabase.from("productos").select("*");
  return productos as Producto[];
}

export default obtenerTodosLosProductos;
