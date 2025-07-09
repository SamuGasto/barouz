"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Badge } from "../../ui/badge";
import { useCarritoStore } from "@/components/providers/carrito-provider";

function CarritoCompra() {
  const itemsEnCarrito = useCarritoStore((state) => state.totalItems);
  return (
    <a
      className="relative rounded-md border-1 p-2"
      href="/cart"
      aria-label="Ir al carrito"
    >
      <ShoppingCart size={20} />
      {itemsEnCarrito > 0 && (
        <Badge className="absolute -top-3 -right-4" variant="destructive">
          {itemsEnCarrito}
        </Badge>
      )}
    </a>
  );
}

export default CarritoCompra;
