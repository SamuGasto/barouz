import { createClient } from "@/utils/supabase/client";
import {
  PedidoRow,
  PedidoInsert,
  PedidoUpdate,
  ProductoRow,
} from "@/types/tipos_supabase_resumidos";

class PedidosService {
  public async obtenerTodosPedidos(): Promise<PedidoRow[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("pedido").select("*");

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerPedidoPorId(id: string): Promise<PedidoRow> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedido")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerTodosLosProductosPorPedido(
    pedido_id: string
  ): Promise<ProductoRow[]> {
    const supabase = createClient();
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

  public async crearPedido(pedido: PedidoInsert): Promise<PedidoRow> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedido")
      .insert(pedido)
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear pedido:", error);
      throw error;
    }

    return data;
  }

  public async modificarPedido(
    pedido_id: string,
    pedido: PedidoUpdate
  ): Promise<PedidoRow> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedido")
      .update(pedido)
      .eq("id", pedido_id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al modificar datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async eliminarPedido(pedido_id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from("pedido")
      .delete()
      .eq("id", pedido_id);

    if (error) {
      console.error("Error al eliminar pedido:", error);
      throw error;
    }

    return true;
  }
}

const pedidosService = new PedidosService();

export default pedidosService;
