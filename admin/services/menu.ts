import { Database } from "@/types/supabase";
import supabase from "@/utils/supabase/client";

class MenuService {
  public async getAllProducts(): Promise<
    Database["public"]["Tables"]["producto"]["Row"][]
  > {
    const { data, error } = await supabase.from("producto").select("*");

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async getProductById(
    id: string
  ): Promise<Database["public"]["Tables"]["producto"]["Row"]> {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerTodosLosProductosPorPedido(pedido_id: string) {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .eq("pedido_id", pedido_id);

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerDetalleProductos(id_pedido_final: string) {
    const { data, error } = await supabase
      .from("pedido")
      .select("*")
      .eq("pedido_final_id", id_pedido_final);

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async crearProducto(
    producto: Database["public"]["Tables"]["producto"]["Insert"]
  ): Promise<Database["public"]["Tables"]["producto"]["Row"]> {
    const { data, error } = await supabase
      .from("producto")
      .insert([producto])
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }

    return data;
  }

  public async actualizarProducto(
    producto: Database["public"]["Tables"]["producto"]["Update"]
  ): Promise<Database["public"]["Tables"]["producto"]["Row"]> {
    if (!producto.id) {
      throw new Error("El ID del producto es requerido");
    }

    const { data, error } = await supabase
      .from("producto")
      .update(producto)
      .eq("id", producto.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }

    return data;
  }

  public async eliminarProducto(id: string): Promise<boolean> {
    const { error } = await supabase.from("producto").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }

    return true;
  }
}

export const menuService = new MenuService();
