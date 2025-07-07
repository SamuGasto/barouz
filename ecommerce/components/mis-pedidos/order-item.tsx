import Image from "next/image";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderItem as OrderItemType } from "@/types/pedidos";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  item: OrderItemType;
  detailed?: boolean;
}

export function OrderItem({ item, detailed = false }: OrderItemProps) {
  const itemTotal = item.informacion.cantidad * (item.producto?.precio || item.informacion.precio_final);
  const extrasTotal = item.extras.reduce((sum, extra) => sum + (extra.precio_final * extra.cantidad), 0);
  const total = itemTotal + extrasTotal;

  return (
    <div className={cn("flex items-start gap-4", detailed && "border-b pb-4 last:border-b-0 last:pb-0")}>
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        {item.producto?.imagen ? (
          <Image
            src={item.producto.imagen}
            alt={item.producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Package className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">{item.producto?.nombre || "Producto no disponible"}</h4>
            <p className="text-sm text-muted-foreground">
              {item.informacion.cantidad}x {item.producto?.precio ? `$${item.producto.precio.toFixed(2)}` : `$${item.informacion.precio_final.toFixed(2)}`}
            </p>
          </div>
          {!detailed && (
            <p className="font-medium">${total.toFixed(2)}</p>
          )}
        </div>

        {detailed && (
          <div className="mt-2 space-y-2">
            {item.extras && item.extras.length > 0 && (
              <div className="ml-4 space-y-1">
                {item.extras.map((extra) => (
                  <div key={extra.extra?.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      + {extra.cantidad}x {extra.extra?.nombre}
                    </span>
                    <span>${(extra.precio_final * extra.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between border-t pt-2 text-sm font-medium">
              <span>Total del artículo</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {!detailed && item.extras && item.extras.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {item.extras.map((extra, idx) => (
              <Badge key={`${extra.extra?.id || idx}`} variant="outline" className="text-xs">
                +{extra.cantidad}x {extra.extra?.nombre}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
