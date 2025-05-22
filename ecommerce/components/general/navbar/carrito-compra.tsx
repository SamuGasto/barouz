"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

function CarritoCompra() {
  const [itemsEnCarrito, setItemsEnCarrito] = React.useState(1);
  return (
    <a
      className="relative rounded-md border-1"
      href="/carrito"
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
