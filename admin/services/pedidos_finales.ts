import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { PedidoFinalScheme } from "@/components/pedidos/tarjetas/dialog-pedido";
import { z } from "zod";
import { TodosLosPedidos } from "@/types/res_pedidos_final";

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
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

function parseToTimestamp(
  fecha: { year: string; month: string; day: string },
  time: { hour: string; minute: string; second: string }
): string {
  if (!fecha || !time) return "";

  // Asegurar que los números tengan 2 dígitos
  const pad = (num: string) => num.padStart(2, "0");

  // Crear un objeto Date con la fecha y hora especificadas
  const date = new Date(
    Number(fecha.year),
    Number(fecha.month) - 1, // Los meses en JavaScript van de 0 a 11
    Number(fecha.day),
    Number(time.hour),
    Number(time.minute),
    Number(time.second || "0")
  );

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    console.error("Fecha inválida:", { fecha, time });
    return "";
  }

  // Obtener la fecha en formato ISO y reemplazar la 'Z' por '+00:00' para consistencia
  return date.toISOString().replace("Z", "+00:00");
}

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
            .map((pe: any) => {
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
            .filter((extra: any) => extra !== null);

          const { producto, pedido_extra, ...informacionPedido } = p;

          const totalExtras = extras.reduce(
            (total: number, extra: any) => total + extra.precio_final,
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

    // Preparar los argumentos para la función RPC
    const rpcArgs: any = {
      p_pedido_final_id: pedido_final_id,
      p_estado: estado,
      p_razon_cancelacion:
        estado === "Cancelado"
          ? razon_cancelacion || "Sin razón especificada"
          : null,
    };

    // Llamar a la función RPC para cambiar el estado
    const { data, error } = await supabase.rpc(
      "gestionar_pedido_final",
      rpcArgs
    );

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

  private rpcArgsSchema = z.object({
    p_usuario_id: z.string().uuid(),
    p_tipo_envio: z.enum(["Delivery", "Retiro en tienda"]),
    p_total_final: z.number().positive(),
    p_detalles: z.array(
      // Zod validará la estructura interna del JSONB
      z.object({
        producto_id: z.string().uuid(),
        cantidad: z.number().int().positive(),
        precio_final: z.number().positive(),
        extras: z
          .array(
            z.object({
              extra_id: z.string().uuid(),
              cantidad: z.number().int().positive(),
            })
          )
          .optional(), // Los extras en el detalle son opcionales
      })
    ),
    p_pedido_final_id: z.string().uuid().optional(), // NO .nullable()
    p_direccion: z.string().optional(), // NO .nullable()
    p_metodo_pago: z.enum(["Transferencia", "Efectivo"]).optional(), // NO .nullable()
    p_estado: z
      .enum([
        "Recibido",
        "En preparación",
        "En camino",
        "Entregado",
        "Cancelado",
      ])
      .optional(), // NO .nullable()
    p_cupon_id: z.string().uuid().optional(), // NO .nullable()
    p_razon_cancelacion: z.string().optional(), // NO .nullable()
    p_fecha_hora_entrega: z.string().optional(), // NO .nullable()
  });

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
      fecha_hora,
      metodo_pago = "Efectivo",
      cupon_id,
    } = pedido_final;

    // --- Log 1: Entrada de la función ---
    console.log("🟢 [PedidoFinalService] Iniciando gestión de pedido final:", {
      pedido_final_id_entrada: pedido_final_id, // Usar un nombre distinto para no confundir con el del RPC
      usuario_id,
      tipo_envio,
      total_final,
      estado,
      razon_cancelacion_entrada: razon_cancelacion,
      fecha_hora_entrada: fecha_hora,
      metodo_pago,
      cupon_id_entrada: cupon_id,
      cantidad_detalles: detalles?.length || 0,
    });

    // Validaciones
    if (!Array.isArray(detalles) || detalles.length === 0) {
      console.error(
        "🔴 [PedidoFinalService] Error de validación: El pedido debe tener al menos un producto."
      );
      throw new Error("El pedido debe tener al menos un producto");
    }
    if (tipo_envio === "Delivery" && (!direccion || direccion.trim() === "")) {
      console.error(
        "🔴 [PedidoFinalService] Error de validación: La dirección es requerida para envíos a domicilio."
      );
      throw new Error("La dirección es requerida para envíos a domicilio");
    }

    // --- Log 2: Detalles recibidos ---
    console.log("🔵 [PedidoFinalService] Detalles recibidos para procesar:", detalles);

    // Agrupar detalles por producto_id y extras para evitar duplicados
    const detallesAgrupados = detalles.reduce<Array<{
      producto_id: string;
      cantidad: number;
      precio_final: number;
      extras?: Array<{ extra_id: string; cantidad: number }>;
    }>>((acumulador, detalle) => {
      // Crear una clave única basada en el producto_id y los extras (si existen)
      const extrasKey = detalle.extras && detalle.extras.length > 0
        ? detalle.extras
            .map(e => `${e.extra_id}:${e.cantidad}`)
            .sort()
            .join('|')
        : 'sin_extras';
      
      const clave = `${detalle.producto.id}_${extrasKey}`;
      
      // Buscar si ya existe un detalle con la misma clave
      const detalleExistente = acumulador.find(d => {
        const dExtrasKey = d.extras && d.extras.length > 0
          ? d.extras.map(e => `${e.extra_id}:${e.cantidad}`).sort().join('|')
          : 'sin_extras';
        return d.producto_id === detalle.producto.id && dExtrasKey === extrasKey;
      });

      if (detalleExistente) {
        // Si ya existe, sumar las cantidades y promediar los precios
        detalleExistente.cantidad += detalle.cantidad;
        detalleExistente.precio_final += detalle.precio_final;
      } else {
        // Si no existe, agregar un nuevo detalle
        const nuevoDetalle = {
          producto_id: detalle.producto.id,
          cantidad: detalle.cantidad,
          precio_final: detalle.precio_final,
          ...(detalle.extras && detalle.extras.length > 0
            ? {
                extras: detalle.extras.map(extra => ({
                  extra_id: extra.extra_id,
                  cantidad: extra.cantidad,
                })),
              }
            : {}),
        };
        acumulador.push(nuevoDetalle);
      }
      return acumulador;
    }, []);

    // --- Log 3: Detalles después de agrupar ---
    console.log("🟣 [PedidoFinalService] Detalles después de agrupar:", detallesAgrupados);
    
    // Mapear al formato final para el RPC
    const detallesRpc = detallesAgrupados;

    // Formatear fecha y hora
    let fechaHoraEntrega: string | undefined = undefined;
    if (fecha_hora) {
      const formattedTime = parseToTimestamp(fecha_hora.fecha, fecha_hora.time);
      if (formattedTime) {
        fechaHoraEntrega = formattedTime;
        // --- Log 2: Fecha/Hora formateada ---
        console.log(
          `🔵 [PedidoFinalService] Fecha/hora de entrega formateada: ${fechaHoraEntrega}`
        );
      } else {
        console.warn(
          "🟡 [PedidoFinalService] Advertencia: No se pudo formatear la fecha/hora de entrega."
        );
      }
    } else {
      console.log(
        "🔵 [PedidoFinalService] No se proporcionó fecha/hora de entrega, se usará la de la base de datos si aplica."
      );
    }

    // --- CONSTRUCCIÓN FINAL DE finalRpcArgs ---
    const finalRpcArgs: Database["public"]["Functions"]["gestionar_pedido_final"]["Args"] =
      {
        p_usuario_id: usuario_id,
        p_tipo_envio: tipo_envio,
        p_total_final: total_final,
        p_detalles: detallesRpc as unknown as Json, // Cast a Json
        p_pedido_final_id: pedido_final_id ?? undefined,
        p_direccion:
          tipo_envio === "Delivery" ? direccion || undefined : undefined,
        p_metodo_pago: metodo_pago,
        p_estado: estado,
        p_cupon_id: cupon_id ?? undefined,
        p_razon_cancelacion:
          estado === "Cancelado" ? razon_cancelacion || undefined : undefined,
        p_fecha_hora_entrega: fechaHoraEntrega,
      };

    // --- Log 3: Argumentos RPC finales ANTES de la llamada ---
    console.log(
      "✅ [PedidoFinalService] Argumentos finales para la función RPC:",
      finalRpcArgs
    );

    try {
      // Validar con Zod
      const validatedArgs = this.rpcArgsSchema.parse(finalRpcArgs);
      console.log("✅ [PedidoFinalService] Argumentos validados con Zod.");

      // Llamar a la función RPC
      const { data, error } = await supabase.rpc(
        "gestionar_pedido_final",
        validatedArgs
      );

      if (error) {
        // --- Log 4: Error de RPC ---
        console.error(
          "❌ [PedidoFinalService] Error en la función RPC:",
          error
        );
        throw new Error(error.message || "Error al procesar el pedido");
      }

      // --- Log 5: Éxito de RPC ---
      console.log(
        "🎉 [PedidoFinalService] Pedido procesado exitosamente con ID:",
        data
      );
      return data as string;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al procesar el pedido";
      // --- Log 6: Error general de procesamiento ---
      console.error(
        "🔥 [PedidoFinalService] Error general al procesar el pedido:",
        errorMessage,
        error
      );
      throw new Error(errorMessage);
    }
  }
}

export const pedidoFinalService = new PedidoFinalService();
