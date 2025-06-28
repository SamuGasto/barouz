import { Database } from "./supabase";

type PedidoFinalRow = Database["public"]["Tables"]["pedido_final"]["Row"];
type PedidoRow = Database["public"]["Tables"]["pedido"]["Row"];
type ProductoRow = Database["public"]["Tables"]["producto"]["Row"];
type ExtraRow = Database["public"]["Tables"]["extra"]["Row"];

type PedidoExtraConDetalles = {
    cantidad: number;
    precio_final: number;
    extra: ExtraRow;
}

export type TodosLosPedidos = {
  pedido_final: {
    informacion: PedidoFinalRow;
    pedidos: {
      informacion: PedidoRow;
      producto: ProductoRow | undefined;
      extras: PedidoExtraConDetalles[];
    }[];
  };
};
