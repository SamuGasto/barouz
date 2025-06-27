import { Database, Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";

type PedidoFinalRow = Tables<"pedido_final">;
type PedidoInsert = Database["public"]["Tables"]["pedido_final"]["Insert"];
type PedidoUpdate = Database["public"]["Tables"]["pedido_final"]["Update"];
type PedidosInternosRow = Tables<"pedido">;
type ProductoRow = Tables<"producto">;
type UsuarioRow = Tables<"usuario">;
type ExtraRow = Tables<"extra">;

type InformacionPedidoFinalCompleto = {
  pedido_final: {
    user_id: string;
    tipo_envio: "Delivery" | "Retiro en tienda";
    estado:
      | "Recibido"
      | "En preparación"
      | "En camino"
      | "Entregado"
      | "Cancelado";
    razon_cancelacion: string | undefined;
  };
  pedidos: {
    pedido_id: string;
    producto: {
      id: string;
      nombre: string;
      precio: number;
    };
    cantidad: number;
    precio_final: number;
    extras: {
      extra_id: string;
      extra_nombre: string;
      cantidad: number;
      precio_final: number;
    }[];
  }[];
  usuario: {
    id: string;
  };
};

class PedidoService {
  public async getAllPedidos(): Promise<PedidoFinalRow[]> {
    const { data, error } = await supabase.from("pedido_final").select("*");

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerDatosPedido(pedido_id: string): Promise<PedidoFinalRow> {
    const { data, error } = await supabase
      .from("pedido_final")
      .select("*")
      .eq("id", pedido_id)
      .single();

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
      throw error;
    }

    return data;
  }

  public async construirPedido(
    informacion: InformacionPedidoFinalCompleto
  ): Promise<PedidoFinalRow | null> {
    const { pedido_final, pedidos, usuario } = informacion;
    let resultado: PedidoFinalRow | null = null;

    /* Anadir logica para insertar el pedido_final, pedido y extras correspondientes */

    return resultado;
  }

  public async crearPedido(pedido: PedidoInsert): Promise<PedidoFinalRow> {
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

  public async obtenerDetallePedidoFinal(pedido_final_id: string) {
    const { data, error } = await supabase
      .from("pedido")
      .select(
        "id,cantidad,precio_final,producto(*),pedido_extra!inner(extra(*))"
      )
      .eq("pedido_final_id", pedido_final_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async obtenerTodosLosProductosPorPedido(
    pedido_id: string
  ): Promise<ProductoRow[]> {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .eq("pedido_id", pedido_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener datos de la base de productos:", error);
      throw error;
    }

    return data;
  }

  public async eliminarPedido(pedido_id: string): Promise<boolean> {
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
