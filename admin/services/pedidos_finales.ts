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

  public async gestionarPedidoFinal(args: GestionarPedidoFinalArgs): Promise<string> {
    const { pedido_final_id, usuario_id, pedido_final } = args;

    // Asegurarnos de que los valores sean exactamente los del enum de la base de datos
    const tipoEnvio: Database["public"]["Enums"]["TipoEnvio"] = 
      pedido_final.tipo_envio === 'Delivery' ? 'Delivery' : 'Retiro en tienda';
      
    const estado: Database["public"]["Enums"]["EstadoPedidos"] = 
      (['Recibido', 'En preparación', 'En camino', 'Entregado', 'Cancelado'].includes(pedido_final.estado))
        ? pedido_final.estado as Database["public"]["Enums"]["EstadoPedidos"]
        : 'Recibido'; // Valor por defecto

    try {
      // 1. Crear o actualizar el pedido final
      let pedidoFinalId = pedido_final_id;
      
      if (pedido_final_id) {
        // Actualizar pedido existente
        const { data: updatedPedido, error: updateError } = await supabase
          .from('pedido_final')
          .update({
            estado,
            tipo_envio: tipoEnvio,
            razon_cancelacion: pedido_final.razon_cancelacion || '',
            total_final: pedido_final.total_final,
            user_id: usuario_id,
            fecha_hora: new Date().toISOString()
          })
          .eq('id', pedido_final_id)
          .select()
          .single();
          
        if (updateError) throw updateError;
      } else {
        // Crear nuevo pedido
        const { data: newPedido, error: insertError } = await supabase
          .from('pedido_final')
          .insert({
            estado,
            tipo_envio: tipoEnvio,
            razon_cancelacion: pedido_final.razon_cancelacion || '',
            total_final: pedido_final.total_final,
            user_id: usuario_id,
            fecha_hora: new Date().toISOString()
          })
          .select()
          .single();
          
        if (insertError) throw insertError;
        pedidoFinalId = newPedido.id;
      }
      
      if (!pedidoFinalId) throw new Error('No se pudo obtener el ID del pedido final');
      
      // 2. Eliminar los pedidos existentes (si es una actualización)
      if (pedido_final_id) {
        const { error: deleteError } = await supabase
          .from('pedido')
          .delete()
          .eq('pedido_final_id', pedidoFinalId);
          
        if (deleteError) throw deleteError;
      }
      
      // 3. Insertar los nuevos pedidos
      for (const detalle of pedido_final.detalles) {
        // Insertar el pedido principal
        const { data: newPedido, error: pedidoError } = await supabase
          .from('pedido')
          .insert({
            pedido_final_id: pedidoFinalId,
            producto_id: detalle.producto.id,
            cantidad: detalle.cantidad,
            precio_final: detalle.precio_final
          })
          .select()
          .single();
          
        if (pedidoError) throw pedidoError;
        
        // Insertar los extras del pedido si los hay
        if (detalle.extras && detalle.extras.length > 0) {
          const extrasToInsert = detalle.extras.map(extra => ({
            pedido_id: newPedido.id,
            extra_id: extra.extra_id,
            cantidad: extra.cantidad
          }));
          
          const { error: extrasError } = await supabase
            .from('pedido_extra')
            .insert(extrasToInsert);
            
          if (extrasError) throw extrasError;
        }
      }
      
      return pedidoFinalId;
    } catch (error: any) {
      console.error('Error en la llamada:', error);
      throw error;
    }
  }
}

export const pedidoFinalService = new PedidoFinalService();
