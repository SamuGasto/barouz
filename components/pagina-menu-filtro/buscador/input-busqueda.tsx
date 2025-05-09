"use client";
import { Input } from "@/components/ui/input";
import React from "react";

function InputBusqueda() {
  const [busqueda, setBusqueda] = React.useState("");
  return (
    <Input
      type="text"
      placeholder="🔍︎ Buscar"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
}

export default InputBusqueda;
