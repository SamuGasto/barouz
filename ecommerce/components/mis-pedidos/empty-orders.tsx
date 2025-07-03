import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyOrders() {
  return (
    <div className="container flex h-[60vh] flex-col items-center justify-center text-center">
      <Package className="mb-4 h-12 w-12 text-gray-400" />
      <h2 className="mb-2 text-2xl font-bold">No hay pedidos recientes</h2>
      <p className="text-muted-foreground">
        Aún no has realizado ningún pedido. ¡Explora nuestro menú y haz tu primer pedido!
      </p>
      <Button className="mt-4" asChild>
        <a href="/menu">Ver menú</a>
      </Button>
    </div>
  );
}
