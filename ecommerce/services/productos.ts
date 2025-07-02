import { CategoriaProductos, ProductoRow } from "@/types/resumen-tipos";
import { createClient } from "@/utils/supabase/client";

class ProductosService {
  public async obtenerTodosLosProductos(): Promise<ProductoRow[]> {
    const supabase = createClient();
    const { data: productos, error } = await supabase
      .from("producto")
      .select("*");

    if (error) {
      throw `Error al obtener todos los productos: ${error}`;
    }

    return productos;
  }

  public async obtenerProductoPorId(id: string): Promise<ProductoRow | null> {
    const supabase = createClient();
    const { data: producto, error } = await supabase
      .from("producto")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw `Error al obtener el producto: ${error}`;
    }

    return producto;
  }

  public async obtenerProductosPorCategoria(
    categoria: CategoriaProductos
  ): Promise<ProductoRow[]> {
    const supabase = createClient();
    const { data: productos, error } = await supabase
      .from("producto")
      .select("*")
      .eq("categoria", categoria);

    if (error) {
      throw `Error al obtener los productos por categoria: ${error}`;
    }

    return productos;
  }
}

export const productosService = new ProductosService();
export default productosService;
