"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

function CarritoCompra() {
  const [itemsEnCarrito, setItemsEnCarrito] = React.useState(1);
  return (
    <Button
      className="relative rounded-md border-1"
      size="icon"
      variant="ghost"
      aria-label="Ir al carrito"
    >
      <a href="/carrito">
        <ShoppingCart size={20} />
      </a>
      {itemsEnCarrito > 0 && (
        <Badge className="absolute -top-2 -right-3" variant="destructive">
          {itemsEnCarrito}
        </Badge>
      )}
    </Button>
  );
}

export default CarritoCompra;
