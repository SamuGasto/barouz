import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
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
  p_tipo_envio: string; // Cambiado a string para coincidir con la definición de la función RPC
  p_estado: string; // Cambiado a string para coincidir con la definición de la función RPC
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
    const supabase = createClient();
    const { data: pedidosFinalesData, error } = await supabase
      .from("pedido_final")
      .select(
        `
        *,
        user_id (
          id,
          nombre
        ),
        pedido (
          *,
          producto (*),
          pedido_extra (
            *,
            extra (*)
          )
        )
      `
      )
      .order("fecha_hora", { ascending: false });

    if (error) {
      console.error("Error al obtener todos los pedidos:", error);
      throw error;
    }

    if (!pedidosFinalesData || pedidosFinalesData.length === 0) {
      return [];
    }

    const response: TodosLosPedidos[] = pedidosFinalesData.map(
      (pedidoFinal) => {
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
              (extra: MappedExtra | null): extra is MappedExtra =>
                extra !== null
            );

          const { producto, pedido_extra, ...informacionPedido } = p;

          const totalExtras = extras.reduce(
            (total: number, extra: MappedExtra) => total + extra.precio_final,
            0
          );
          const precioUnitario = producto.precio + totalExtras;
          informacionPedido.precio_final =
            precioUnitario * informacionPedido.cantidad;

          const pedidoFinal = {
            informacion: informacionPedido,
            producto: p.producto,
            extras: extras,
          };
          return pedidoFinal;
        });

        const { pedido, user_id, ...informacionPedidoFinal } = pedidoFinal;
        return {
          pedido_final: {
            informacion: {
              ...informacionPedidoFinal,
              user_id: user_id?.id || "",
            },
            usuario: {
              id: user_id?.id || "",
              nombre: user_id?.nombre || "Usuario no encontrado",
            },
            pedidos: pedidosAnidados,
          },
        };
      }
    );

    return response;
  }

  public async obtenerDatosPedidoFinal(
    pedido_id: string
  ): Promise<PedidoFinalRow> {
    const supabase = createClient();
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
    const supabase = createClient();
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
    const supabase = createClient();
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
    const supabase = createClient();
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
    const supabase = createClient();
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

  public async cambiarEstadoPedidoFinal(
    pedido_final_id: string,
    estado: Database["public"]["Enums"]["EstadoPedidos"],
    razon_cancelacion?: string
  ) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pedido_final")
      .update({
        estado,
        razon_cancelacion:
          estado === "Cancelado" ? razon_cancelacion || "" : "",
      })
      .eq("id", pedido_final_id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al cambiar el estado del pedido:", error);
      throw error;
    }
    return data;
  }

  public async eliminarPedidoFinal(pedido_id: string): Promise<boolean> {
    const supabase = createClient();
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

  // Tipos para los argumentos de la función RPC
  private rpcExtraSchema = {
    extra_id: z.string(),
    cantidad: z.number(),
  };

  private rpcDetalleSchema = {
    producto_id: z.string(),
    cantidad: z.number(),
    precio_final: z.number(),
    extras: z.array(z.object(this.rpcExtraSchema)).optional(),
  } as const;

  private rpcArgsSchema = {
    p_total_final: z.number(),
    p_detalles: z.array(z.object(this.rpcDetalleSchema)),
    p_usuario_id: z.string(),
    p_tipo_envio: z.string(),
    p_estado: z.string(),
    p_pedido_final_id: z.string().optional().nullable(),
    p_direccion: z.string().optional().nullable(),
    p_razon_cancelacion: z.string().optional().nullable(),
  } as const;

  public async gestionarPedidoFinal(
    args: GestionarPedidoFinalArgs
  ): Promise<string> {
    const supabase = createClient();
    const { pedido_final_id, usuario_id, pedido_final } = args;
    const {
      tipo_envio,
      direccion,
      razon_cancelacion,
      total_final,
      detalles,
      estado = "Recibido",
    } = pedido_final;

    console.log("Iniciando gestión de pedido final:", {
      pedido_final_id,
      usuario_id,
      tipo_envio,
      total_final,
      cantidad_detalles: detalles?.length || 0,
    });

    // Validar que el pedido tenga detalles
    if (!Array.isArray(detalles) || detalles.length === 0) {
      throw new Error("El pedido debe tener al menos un producto");
    }

    // Validar dirección si es envío a domicilio
    if (tipo_envio === "Delivery" && (!direccion || direccion.trim() === "")) {
      throw new Error("La dirección es requerida para envíos a domicilio");
    }

    // Preparar los detalles para la función RPC
    const detallesRpc = detalles.map((detalle) => {
      const detalleBase = {
        producto_id: detalle.producto.id,
        cantidad: detalle.cantidad,
        precio_final: detalle.precio_final,
      };

      // Agregar extras si existen
      if (detalle.extras?.length) {
        return {
          ...detalleBase,
          extras: detalle.extras.map((extra) => ({
            extra_id: extra.extra_id,
            cantidad: extra.cantidad,
          })),
        };
      }
      return detalleBase;
    });

    try {
      // Validar los argumentos con Zod
      const rpcArgs = {
        p_total_final: total_final,
        p_detalles: detallesRpc,
        p_usuario_id: usuario_id,
        p_tipo_envio: tipo_envio,
        p_estado: estado,
        p_pedido_final_id: pedido_final_id || null,
        p_direccion: tipo_envio === "Delivery" ? direccion || "" : "",
        p_razon_cancelacion:
          estado === "Cancelado" ? razon_cancelacion || "" : "",
      };

      // Validar con Zod
      const validatedArgs = z.object(this.rpcArgsSchema).parse(rpcArgs);

      // Llamar a la función RPC con aserción de tipo
      const { data, error } = (await (supabase.rpc as any)(
        "gestionar_pedido_final",
        {
          ...validatedArgs,
          p_pedido_final_id: validatedArgs.p_pedido_final_id || null,
        }
      )) as { data: string; error: any };

      if (error) {
        console.error("Error en la función RPC:", error);
        throw new Error(error.message || "Error al procesar el pedido");
      }

      console.log("Pedido procesado exitosamente con ID:", data);
      return data as string;
    } catch (error) {
      console.error("Error en gestionarPedidoFinal:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al procesar el pedido";
      throw new Error(`Error al procesar el pedido: ${errorMessage}`);
    }
  }
}

export const pedidoFinalService = new PedidoFinalService();
