import todosLosProductos from "@/data/examples/todos-productos";
import { Producto } from "@/data/tipos";
import { createClient } from "@/utils/supabase/client";

async function obtenerTodosLosProductos() {
  return Promise.resolve(todosLosProductos);

  const supabase = createClient();
  const { data: productos } = await supabase.from("productos").select("*");
  return productos as Producto[];
}

export default obtenerTodosLosProductos;
