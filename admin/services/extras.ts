import supabase from "@/utils/supabase/client";
import {
  ExtraRow,
  ExtraInsert,
  ExtraUpdate,
  CategoriaProductos,
} from "@/types/tipos_supabase_resumidos";

class ExtraService {
  public async obtenerTodosLosExtras(): Promise<ExtraRow[]> {
    const { data, error } = await supabase.from("extra").select("*");

    if (error) {
      console.error("Error al obtener extras:", error);
      throw error;
    }

    return data;
  }

  public async obtenerExtraPorId(id: string): Promise<ExtraRow> {
    const { data, error } = await supabase
      .from("extra")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener extra:", error);
      throw error;
    }

    return data;
  }

  public async obtenerExtrasPorPedido(pedido_id: string) {
    const { data, error } = await supabase
      .from("pedido_extra")
      .select("extra_id")
      .eq("pedido_id", pedido_id);

    if (error) {
      console.error("Error al obtener extras por pedido:", error);
      throw error;
    }

    return data.filter((item) => item.extra_id !== null);
  }

  public async obtenerExtrasPorCategoriaProducto(
    categoria: CategoriaProductos
  ): Promise<{ extras: ExtraRow[]; categorias: string[] }> {
    const { data, error } = await supabase
      .from("extra")
      .select("*")
      .eq("categoria-producto", categoria)
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error al obtener extras por categoria:", error);
      throw error;
    }

    const categorias_extra = data.map((extra) => extra.categoria);
    const categorias_unicas = Array.from(new Set(categorias_extra));

    return {
      extras: data,
      categorias: categorias_unicas,
    };
  }

  public async obtenerCategoriasExtras(): Promise<string[]> {
    const { data, error } = await supabase
      .from("categorias_unicas_view")
      .select("categoria");

    if (error) {
      console.error("Error al obtener categorias extras:", error);
      throw error;
    }

    return data.map((item) => item.categoria || "");
  }

  public async crearExtra(extra: ExtraInsert): Promise<ExtraRow> {
    const { data, error } = await supabase
      .from("extra")
      .insert([extra])
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear extra:", error);
      throw error;
    }

    return data;
  }

  public async actualizarExtra(extra: ExtraUpdate): Promise<ExtraRow> {
    if (!extra.id) {
      throw new Error("El ID del extra es requerido");
    }

    const { data, error } = await supabase
      .from("extra")
      .update(extra)
      .eq("id", extra.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al actualizar extra:", error);
      throw error;
    }

    return data;
  }

  public async eliminarExtra(id: string): Promise<void> {
    const { error } = await supabase.from("extra").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar extra:", error);
      throw error;
    }
  }
}

export const extraService = new ExtraService();
export default extraService;
