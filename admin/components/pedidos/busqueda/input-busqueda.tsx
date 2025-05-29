"use client";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";
import { useFiltrosStore } from "../../providers/filtros-store-provider";

function InputBusqueda() {
  const [busqueda, setBusqueda] = React.useState("");
  const setFiltroTextoPedidos = useFiltrosStore((state) => state.setFiltroTextoPedidos);
  return (
    <div className="relative flex w-full">
      <Input
        type="text"
        placeholder="🔍︎ Buscar pedidos por número o cliente..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setFiltroTextoPedidos(e.target.value);
        }}
      />
      <X
        className="hover:text-primary/80 absolute top-[10px] right-2 cursor-pointer"
        visibility={busqueda == "" ? "hidden" : "visible"}
        size={20}
        onClick={() => {
          setBusqueda("");
          setFiltroTextoPedidos("");
        }}
      />
    </div>
  );
}

export default InputBusqueda;
