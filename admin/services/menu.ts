import Supabase from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

class MenuService {
  private client: SupabaseClient<any, "public", any>;

  constructor() {
    this.client = Supabase.getClient();
  }

  public async obtenerTodosLosProductosPorPedido(pedido_id: string) {
    try {
      const { data, error } = await this.client
        .from("producto")
        .select("*")
        .eq("pedido_id", pedido_id);

      if (error) {
        console.error("Error al obtener datos de la base de productos:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      return [];
    }
  }

  public async obtenerProductoViaId(id: string) {
    try {
      const { data, error } = await this.client
        .from("producto")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error al obtener producto:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return null;
    }
  }

  public async obtenerDetalleProductos(id_pedido_final: string) {
    try {
      const { data, error } = await this.client
        .from("pedido")
        .select("*")
        .eq("pedido_final_id", id_pedido_final);

      if (error) {
        console.error("Error al obtener datos de la base de productos:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      return [];
    }
  }

  public async obtenerMenuCompleto(): Promise<
    Database["public"]["Tables"]["producto"]["Row"][]
  > {
    try {
      const { data, error } = await this.client.from("producto").select("*");

      if (error) {
        console.error("Error al obtener datos de la base de productos:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      return [];
    }
  }

  public async crearProducto(
    producto: Database["public"]["Tables"]["producto"]["Insert"]
  ): Promise<Database["public"]["Tables"]["producto"]["Row"][] | null> {
    try {
      const { data, error } = await this.client
        .from("producto")
        .insert([producto])
        .select();

      if (error) {
        console.error("Error al crear producto:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      return null;
    }
  }

  public async actualizarProducto(
    producto: Database["public"]["Tables"]["producto"]["Update"]
  ): Promise<Database["public"]["Tables"]["producto"]["Row"][] | null> {
    try {
      const { data, error } = await this.client
        .from("producto")
        .update(producto)
        .eq("id", producto.id)
        .select();

      if (error) {
        console.error("Error al actualizar producto:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return null;
    }
  }

  public async eliminarProducto(id: string): Promise<boolean> {
    try {
      const { error } = await this.client
        .from("producto")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al eliminar producto:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return false;
    }
  }
}

export default MenuService;
