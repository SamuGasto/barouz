import { TodosLosPedidos, PedidoRow, ProductoRow, PedidoExtraConDetalles, EstadoPedido, TipoEnvio } from "./resumen-tipos";

export type OrderStatus = EstadoPedido;

export type OrderItem = {
  informacion: PedidoRow;
  producto?: ProductoRow;
  extras: PedidoExtraConDetalles[];
};

export type Order = TodosLosPedidos;

export type OrdersResponse = Order[];
