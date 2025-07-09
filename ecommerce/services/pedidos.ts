import { createClient } from "@/utils/supabase/client";
import {
  MetodoDePago,
  TipoEnvio,
  TipoDescuento,
  TodosLosPedidos,
  estadoPedidoArray,
} from "@/types/resumen-tipos";
import z from "zod/v4";
import {
  CheckoutFormData,
  metodoPagoArray,
  tipoEnvioArray,
} from "@/types/checkout";
import { CarritoState } from "@/stores/carrito";

type MappedExtra = {
  cantidad: number;
  precio_final: number;
  extra: any; // The extra object from DB
};

export type GestionarPedidoFinalArgs = {
  pedido_final_id: string | null;
  usuario_id: string;
  pedido_final: PedidoFinal;
};

// Definición de tipos para los argumentos de tu función
type PedidoItemDetalle = {
  producto_id: string;
  cantidad: number;
  precio_final: number;
  extras?: Array<{
    extra_id: string;
    cantidad: number;
  }>;
};

type NuevoPedidoInput = {
  tipoDeEnvio: TipoEnvio;
  metodoPago: MetodoDePago;
  items: PedidoItemDetalle[];
  direccion?: string;
  cupon?: {
    id: string; // ID del cupón
    tipo_descuento: TipoDescuento;
    valor_descuento: number;
  } | null;
};

export interface CrearNuevoPedidoCompletoArgs {
  usuario_id: string;
  pedido: NuevoPedidoInput;
}

export type PedidoFinal = CheckoutFormData & CarritoState;

class PedidosService {
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
      .order("created_at", { ascending: false });

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

  public async obtenerPedidoPorId(id: string) {
    const supabase = createClient();
    const { data: pedido } = await supabase
      .from("pedido")
      .select("*")
      .eq("id", id);
    return pedido;
  }

  public async obtenerPedidosPorPedidoFinal(pedido_final_id: string) {
    const supabase = createClient();
    const { data: pedidos } = await supabase
      .from("pedido")
      .select("*")
      .eq("pedido_final_id", pedido_final_id);
    return pedidos;
  }

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
    p_usuario_id: z.string(),
    p_tipo_envio: z.enum(tipoEnvioArray),
    p_total_final: z.number().positive(),
    p_detalles: z.array(
      z.object({
        producto_id: z.string(),
        cantidad: z.number().int().positive(),
        precio_final: z.number().positive(),
        extras: z
          .array(
            z.object({
              extra_id: z.string(),
              cantidad: z.number().int().positive(),
            })
          )
          .optional(),
      })
    ),
    p_direccion: z.string().nullable().optional(),
    p_metodo_pago: z.enum(metodoPagoArray).optional(),
    p_estado: z.enum(estadoPedidoArray).optional(),
    p_cupon_id: z.string().nullable().optional(),
  };

  public async crearNuevoPedidoCompleto(
    args: CrearNuevoPedidoCompletoArgs
  ): Promise<string> {
    const { usuario_id, pedido } = args;
    const { tipoDeEnvio, direccion, metodoPago, items, cupon } = pedido;

    console.log("Iniciando creación de nuevo pedido completo:", {
      usuario_id,
      tipoDeEnvio,
      direccion,
      metodoPago,
      items,
      cupon,
    });

    // Validaciones
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("El pedido debe tener al menos un producto");
    }

    if (tipoDeEnvio === "Delivery" && (!direccion || direccion.trim() === "")) {
      throw new Error("La dirección es requerida para envíos a domicilio");
    }

    // Preparar los detalles para la función RPC
    const detallesRpc = items.map((detalle) => {
      const detalleBase = {
        producto_id: detalle.producto_id,
        cantidad: detalle.cantidad,
        precio_final: detalle.precio_final,
      };

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
      let totalFinal = items.reduce(
        (total, item) => total + item.precio_final,
        0
      );

      // Sumar costo de envío si aplica
      if (tipoDeEnvio === "Delivery") {
        totalFinal += 5000; // Asumiendo un costo de envío fijo, como en tu ejemplo
      }

      // Aplicar descuento de cupón
      if (cupon) {
        if (cupon.tipo_descuento === "porcentaje") {
          totalFinal -= (cupon.valor_descuento / 100) * totalFinal;
        } else {
          totalFinal -= cupon.valor_descuento;
        }
      }

      const rpcArgs = {
        p_usuario_id: usuario_id,
        p_tipo_envio: tipoDeEnvio,
        p_total_final: totalFinal,
        p_detalles: detallesRpc,
        p_direccion: tipoDeEnvio === "Delivery" ? direccion || "" : "",
        p_metodo_pago: metodoPago,
        p_estado: "Recibido", // Un nuevo pedido siempre inicia como 'Recibido'
        p_cupon_id: cupon ? cupon.id : null,
      };

      // Validar con Zod
      const validatedArgs = z.object(this.rpcArgsSchema).parse(rpcArgs);

      const supabase = createClient();
      const { data, error } = await supabase.rpc(
        "crear_nuevo_pedido_completo", // Nombre de la nueva función RPC
        validatedArgs as any
      );

      if (error) {
        console.error(
          "Error en la función RPC 'crear_nuevo_pedido_completo':",
          error
        );
        throw new Error(error.message || "Error al crear el pedido");
      }

      console.log("Nuevo pedido creado exitosamente con ID:", data);
      return data as string;
    } catch (error) {
      console.error("Error en crearNuevoPedidoCompleto:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al crear el pedido";
      throw new Error(`Error al crear el pedido: ${errorMessage}`);
    }
  }
}

export const pedidosService = new PedidosService();
export default pedidosService;
