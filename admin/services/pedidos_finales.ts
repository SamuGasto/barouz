import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { PedidoFinalScheme } from "@/components/pedidos/tarjetas/dialog-pedido";
import { z } from "zod";
import { TodosLosPedidos } from "@/types/res_pedidos_final";
import {
  PedidoFinalInsert,
  PedidoFinalRow,
  PedidoRow,
  ProductoRow,
} from "@/types/tipos_supabase_resumidos";

// Infer types from Zod schema
type PedidoFinal = z.infer<typeof PedidoFinalScheme>;
type DetalleEnPedido = PedidoFinal["detalles"][number];
type ExtraEnDetalle = DetalleEnPedido["extras"][number];

// Type for the public method
export type GestionarPedidoFinalArgs = {
  pedido_final_id: string | null;
  usuario_id: string;
  pedido_final: PedidoFinal;
};

// Types for the RPC function arguments
type RpcExtra = {
  extra_id: string;
  cantidad: number;
};

type RpcDetalle = {
  pedido_id: string | null;
  producto_id: string;
  cantidad: number;
  extras: RpcExtra[];
};

type GestionarPedidoFinalRpcArgs = {
  p_pedido_final_id: string | null;
  p_usuario_id: string;
  p_tipo_envio: Database["public"]["Enums"]["TipoEnvio"];
  p_estado: Database["public"]["Enums"]["EstadoPedidos"];
  p_razon_cancelacion: string | null;
  p_detalles: RpcDetalle[];
};

// Helper type for mapping extras in obtenerTodosLosPedidos
type MappedExtra = {
  cantidad: number;
  precio_final: number;
  extra: any; // The extra object from DB
};

class PedidoFinalService {
  public async obtenerTodosLosPedidos(): Promise<TodosLosPedidos[]> {
    const { data: pedidosFinalesData, error } = await supabase
      .from("pedido_final")
      .select(
        `
        *,
        pedido (
          *,
          producto (*),
          pedido_extra (
            *,
            extra (*)
          )
        )
      `
      );

    if (error) {
      console.error("Error al obtener todos los pedidos:", error);
      throw error;
    }

    if (!pedidosFinalesData) {
      return [];
    }

    const response: TodosLosPedidos[] = pedidosFinalesData.map((pedidoFinal) => {
      const pedidosAnidados = (pedidoFinal.pedido || []).map((p: any) => {
        const extras = (p.pedido_extra || [])
          .map((pe: any): MappedExtra | null => {
            if (!pe.extra) {
              return null;
            }
            const precioFinalCalculado = pe.extra.precio * pe.cantidad;
            return {
              cantidad: pe.cantidad,
              precio_final: precioFinalCalculado,
              extra: pe.extra,
            };
          })
          .filter(
            (extra: MappedExtra | null): extra is MappedExtra => extra !== null
          );

        const { producto, pedido_extra, ...informacionPedido } = p;

        const totalExtras = extras.reduce(
          (total: number, extra: MappedExtra) => total + extra.precio_final,
          0
        );
        const precioUnitario = producto.precio + totalExtras;
        informacionPedido.precio_final =
          precioUnitario * informacionPedido.cantidad;

        return {
          informacion: informacionPedido,
          producto: p.producto,
          extras: extras,
        };
      });

      const { pedido, ...informacionPedidoFinal } = pedidoFinal;

      return {
        pedido_final: {
          informacion: informacionPedidoFinal,
          pedidos: pedidosAnidados,
        },
      };
    });

    return response;
  }

  public async obtenerDatosPedidoFinal(
    pedido_id: string
  ): Promise<PedidoFinalRow> {
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

  public async crearPedidoFinalEnBD(
    pedido: PedidoFinalInsert
  ): Promise<PedidoFinalRow> {
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

  public async obtenerPedidosPorPedidoFinal(
    pedido_final_id: string
  ): Promise<PedidoRow[]> {
    const { data, error } = await supabase
      .from("pedido")
      .select("*")
      .eq("pedido_final_id", pedido_final_id);

    if (error) {
      console.error("Error al obtener datos de la base de pedidos:", error);
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

  public async gestionarPedidoFinal(
    args: GestionarPedidoFinalArgs
  ): Promise<string> {
    const { pedido_final_id, usuario_id, pedido_final } = args;

    const detallesParaRPC: RpcDetalle[] = pedido_final.detalles.map(
      (detalle: DetalleEnPedido) => ({
        pedido_id: detalle.pedido_id || null,
        producto_id: detalle.producto.id,
        cantidad: detalle.cantidad,
        extras: detalle.extras.map((extra: ExtraEnDetalle) => ({
          extra_id: extra.extra_id,
          cantidad: extra.cantidad,
        })),
      })
    );

    const rpcArgs: GestionarPedidoFinalRpcArgs = {
      p_pedido_final_id: pedido_final_id,
      p_usuario_id: usuario_id,
      p_tipo_envio: pedido_final.tipo_envio,
      p_estado: pedido_final.estado,
      p_razon_cancelacion: pedido_final.razon_cancelacion || null,
      p_detalles: detallesParaRPC,
    };

    // La definición de tipos de la RPC de Supabase puede ser inconsistente,
    // especialmente con parámetros que aceptan NULL.
    // Usamos 'as any' aquí para evitar un error de tipeo del lado del cliente,
    // mientras mantenemos la seguridad de tipos al construir el objeto 'rpcArgs'.
    const { data, error } = await supabase.rpc(
      "gestionar_pedido_final",
      rpcArgs as any
    );

    if (error) {
      console.error("Error al llamar a gestionar_pedido_final RPC:", error);
      throw error;
    }

    return data;
  }
}

export const pedidoFinalService = new PedidoFinalService();
