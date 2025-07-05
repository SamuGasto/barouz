import { Database } from "./supabase";

export type ProductoRow = Database["public"]["Tables"]["producto"]["Row"];
export type ProductoInsert = Database["public"]["Tables"]["producto"]["Insert"];
export type ProductoUpdate = Database["public"]["Tables"]["producto"]["Update"];
export type ExtraRow = Database["public"]["Tables"]["extra"]["Row"];
export type ExtraInsert = Database["public"]["Tables"]["extra"]["Insert"];
export type ExtraUpdate = Database["public"]["Tables"]["extra"]["Update"];
export type PedidoRow = Database["public"]["Tables"]["pedido"]["Row"];
export type PedidoInsert = Database["public"]["Tables"]["pedido"]["Insert"];
export type PedidoUpdate = Database["public"]["Tables"]["pedido"]["Update"];
export type PedidoFinalRow =
  Database["public"]["Tables"]["pedido_final"]["Row"];
export type PedidoFinalInsert =
  Database["public"]["Tables"]["pedido_final"]["Insert"];
export type PedidoFinalUpdate =
  Database["public"]["Tables"]["pedido_final"]["Update"];
export type PedidoExtraRow =
  Database["public"]["Tables"]["pedido_extra"]["Row"];
export type PedidoExtraInsert =
  Database["public"]["Tables"]["pedido_extra"]["Insert"];
export type PedidoExtraUpdate =
  Database["public"]["Tables"]["pedido_extra"]["Update"];
export type UsuarioRow = Database["public"]["Tables"]["usuario"]["Row"];
export type UsuarioInsert = Database["public"]["Tables"]["usuario"]["Insert"];
export type UsuarioUpdate = Database["public"]["Tables"]["usuario"]["Update"];
export type RolesInsert =
  Database["public"]["Tables"]["roles_usuarios"]["Insert"];
export type RolesUpdate =
  Database["public"]["Tables"]["roles_usuarios"]["Update"];
export type RolesRow = Database["public"]["Tables"]["roles_usuarios"]["Row"];
export type CuponRow = Database["public"]["Tables"]["cupon"]["Row"];
export type CuponInsert = Database["public"]["Tables"]["cupon"]["Insert"];
export type CuponUpdate = Database["public"]["Tables"]["cupon"]["Update"];
export type CategoriaProductos =
  Database["public"]["Enums"]["CategoriaProducto"];
export type EstadoPedido = Database["public"]["Enums"]["EstadoPedidos"];
export type TipoEnvio = Database["public"]["Enums"]["TipoEnvio"];
export type LocalRow = Database["public"]["Tables"]["local"]["Row"];
export type LocalInsert = Database["public"]["Tables"]["local"]["Insert"];
export type LocalUpdate = Database["public"]["Tables"]["local"]["Update"];
export type HorarioRow = Database["public"]["Tables"]["horario"]["Row"];
export type HorarioInsert = Database["public"]["Tables"]["horario"]["Insert"];
export type HorarioUpdate = Database["public"]["Tables"]["horario"]["Update"];
export type DiaSemana = Database["public"]["Enums"]["DiasDeLaSemana"];
export type LocalConHorarios = LocalRow & {
  horarios: HorarioRow[];
};
export type TodosLosPedidos = {
  pedido_final: {
    usuario: {
      id: string;
      nombre: string;
    };
    informacion: PedidoFinalRow;
    pedidos: {
      informacion: PedidoRow;
      producto: ProductoRow | undefined;
      extras: PedidoExtraConDetalles[];
    }[];
  };
};
export type PedidoExtraConDetalles = {
  cantidad: number;
  precio_final: number;
  extra: ExtraRow;
};
export type MetodoDePago = Database["public"]["Enums"]["MetodoDePago"];
export type TipoDescuento = Database["public"]["Enums"]["TipoDescuento"];
export const estadoPedidoArray: EstadoPedido[] = [
  "Recibido",
  "En preparación",
  "En camino",
  "Entregado",
  "Cancelado",
] as const;
