import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

type PedidoRow = Database["public"]["Tables"]["pedido_final"]["Row"];
type PedidoInsert = Database["public"]["Tables"]["pedido_final"]["Insert"];
type PedidoUpdate = Database["public"]["Tables"]["pedido_final"]["Update"];

class PedidoService {
  public async getAllPedidos(): Promise<
    Database["public"]["Tables"]["pedido_final"]["Row"][]
  > {
    const { data, error } = await supabase.from("pedido_final").select("*");

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async crearPedido(pedido: PedidoInsert): Promise<PedidoRow> {
    const { data, error } = await supabase
      .from("pedido_final")
      .insert([pedido])
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear pedido:", error);
      throw error;
    }

    return data;
  }

  public async obtenerDetalleProductos(pedido_final_id: string) {
    const { data, error } = await supabase
      .from("pedido")
      .select("*")
      .eq("pedido_final_id", pedido_final_id);

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

  public async eliminarPedido(pedido_id: string) {
    const { error } = await supabase
      .from("pedido_final")
      .delete()
      .eq("id", pedido_id);

    if (error) {
      console.error("Error al eliminar pedido:", error);
      throw error;
    }

    return true;
  }
}

export const pedidoService = new PedidoService();
