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
export type CuponRow = Database["public"]["Tables"]["cupon"]["Row"];
export type CuponInsert = Database["public"]["Tables"]["cupon"]["Insert"];
export type CuponUpdate = Database["public"]["Tables"]["cupon"]["Update"];
export type CategoriaProductos =
  Database["public"]["Enums"]["CategoriaProducto"];
export type EstadoPedido = Database["public"]["Enums"]["EstadoPedidos"];
export type TipoEnvio = Database["public"]["Enums"]["TipoEnvio"];
