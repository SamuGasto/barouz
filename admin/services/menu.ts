import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import {
  ProductoInsert,
  ProductoRow,
  ProductoUpdate,
} from "@/types/tipos_supabase_resumidos";

class MenuService {
  public async getAllProducts(): Promise<ProductoRow[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .order("categoria", { ascending: true });

      if (error) {
        console.error("Error al obtener productos:", error);
        throw new Error(`Error al obtener productos: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("Error inesperado en getAllProducts:", error);
      throw new Error("No se pudieron obtener los productos");
    }
  }

  public async getProductById(id: string): Promise<ProductoRow> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(`Error al obtener el producto: ${error.message}`);
      }

      if (!data) {
        throw new Error("Producto no encontrado");
      }

      return data;
    } catch (error) {
      console.error("Error inesperado en getProductById:", error);
      throw new Error("No se pudo obtener el producto");
    }
  }

  public async obtenerTodosLosProductosPorPedido(
    pedido_id: string
  ): Promise<ProductoRow[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .eq("pedido_id", pedido_id);

      if (error) {
        throw new Error(
          `Error al obtener productos del pedido: ${error.message}`
        );
      }

      return data || [];
    } catch (error) {
      console.error(
        "Error inesperado en obtenerTodosLosProductosPorPedido:",
        error
      );
      throw new Error("No se pudieron obtener los productos del pedido");
    }
  }

  public async obtenerPedidosPorPedidoFinal(id_pedido_final: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pedido")
        .select("*")
        .eq("pedido_final_id", id_pedido_final);

      if (error) {
        throw new Error(`Error al obtener pedidos: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("Error inesperado en obtenerPedidosPorPedidoFinal:", error);
      throw new Error("No se pudieron obtener los pedidos");
    }
  }

  public async crearProducto(
    producto: Omit<ProductoInsert, "id" | "created_at" | "updated_at">
  ): Promise<ProductoRow> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("producto")
        .insert([producto])
        .select()
        .single();

      if (error) {
        throw new Error(`Error al crear producto: ${error.message}`);
      }

      if (!data) {
        throw new Error("No se pudo crear el producto");
      }

      return data;
    } catch (error) {
      console.error("Error inesperado en crearProducto:", error);
      throw new Error("No se pudo crear el producto");
    }
  }

  public async actualizarProducto(
    id: string,
    updates: Partial<ProductoUpdate>
  ): Promise<ProductoRow> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("producto")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Error al actualizar producto: ${error.message}`);
      }

      if (!data) {
        throw new Error("No se pudo actualizar el producto");
      }

      return data;
    } catch (error) {
      console.error("Error inesperado en actualizarProducto:", error);
      throw new Error("No se pudo actualizar el producto");
    }
  }

  public async eliminarProducto(id: string): Promise<void> {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("producto").delete().eq("id", id);

      if (error) {
        throw new Error(`Error al eliminar producto: ${error.message}`);
      }
    } catch (error) {
      console.error("Error inesperado en eliminarProducto:", error);
      throw new Error("No se pudo eliminar el producto");
    }
  }
}

export const menuService = new MenuService();
