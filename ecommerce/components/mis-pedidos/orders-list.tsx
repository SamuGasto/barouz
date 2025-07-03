import { OrderCard } from "./order-card";
import { Order } from "@/types/pedidos";

interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
      {orders.map((order) => (
        <OrderCard key={order.pedido_final.informacion.id} order={order} />
      ))}
    </div>
  );
}
