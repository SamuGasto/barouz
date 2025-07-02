import { createClient } from "@/utils/supabase/client";
import { TodosLosPedidos } from "@/types/resumen-tipos";

type MappedExtra = {
  cantidad: number;
  precio_final: number;
  extra: any; // The extra object from DB
};

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
}

export const pedidosService = new PedidosService();
export default pedidosService;
