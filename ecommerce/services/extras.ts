import { CategoriaProductos } from "@/types/resumen-tipos";
import { createClient } from "@/utils/supabase/client";

class ExtrasService {
  public async obtenerTodosLosExtras() {
    const supabase = createClient();
    const { data: extras } = await supabase.from("extra").select("*");
    return extras;
  }

  public async obtenerExtraPorId(id: string) {
    const supabase = createClient();
    const { data: extra } = await supabase
      .from("extra")
      .select("*")
      .eq("id", id);
    return extra;
  }

  public async obtenerExtrasPorCategoriaProducto(
    categoria_producto: CategoriaProductos
  ) {
    const supabase = createClient();
    const { data: extras } = await supabase
      .from("extra")
      .select("*")
      .eq("categoria-producto", categoria_producto);
    return extras;
  }
  public async obtenerCategoriasExtras(): Promise<string[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categorias_unicas_view")
      .select("categoria");

    if (error) {
      console.error("Error al obtener categorias extras:", error);
      throw error;
    }

    return data.map((item) => item.categoria || "");
  }
}

export const extrasService = new ExtrasService();
export default extrasService;
