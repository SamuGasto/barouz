"use client";

import { usePedidos } from "@/hooks/usePedidos";
import { OrdersList } from "@/components/mis-pedidos/orders-list";
import { OrderSkeleton } from "@/components/mis-pedidos/order-skeleton";
import { ErrorState } from "@/components/mis-pedidos/error-state";
import { EmptyOrders } from "@/components/mis-pedidos/empty-orders";
import { Order } from "@/types/pedidos";

export default function MisPedidos() {
  const { data, isLoading, error } = usePedidos<Order[]>();
  
  // Transform the data to ensure it matches the expected structure
  const pedidos = data ? data.map(pedido => ({
    ...pedido,
    pedido_final: {
      ...pedido.pedido_final,
      informacion: {
        ...pedido.pedido_final.informacion,
        // Ensure all required fields are present and properly typed
        tipo_envio: pedido.pedido_final.informacion.tipo_envio as 'Delivery' | 'Retiro en tienda',
        estado: pedido.pedido_final.informacion.estado as 'Recibido' | 'En preparación' | 'En camino' | 'Entregado' | 'Cancelado'
      }
    }
  })) : [];

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Mis Pedidos</h1>
          <p className="text-muted-foreground">Revisa el historial de tus pedidos recientes</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {[1, 2, 3].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  if (pedidos.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Mis Pedidos</h1>
        <p className="text-muted-foreground">Revisa el historial de tus pedidos recientes</p>
      </div>
      <OrdersList orders={pedidos} />
    </div>
  );
}
