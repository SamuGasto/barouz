import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderItem } from "./order-item";
import { Order } from "@/types/pedidos";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const orderDate = new Date(order.pedido_final.informacion.fecha_hora);
  const formattedDate = format(orderDate, "PPP", { locale: es });
  const status = order.pedido_final.informacion.estado;
  const total = order.pedido_final.informacion.total_final;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Orden #{order.pedido_final.informacion.id.split("-")[0]}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <OrderStatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {order.pedido_final.pedidos.map((item, idx) => (
            <OrderItem key={`${item.informacion.id}-${idx}`} item={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/25 px-4 py-3">
        <span className="font-medium">Total: ${total.toFixed(2)}</span>

      </CardFooter>
    </Card>
  );
}
