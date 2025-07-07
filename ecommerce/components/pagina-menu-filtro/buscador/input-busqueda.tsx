"use client";
import { useFiltrosStore } from "@/components/providers/filtros-provider";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";

function InputBusqueda() {
  const [busqueda, setBusqueda] = React.useState("");
  const setFiltrotexto = useFiltrosStore((state) => state.setFiltroTexto);
  return (
    <div className="relative flex w-full">
      <Input
        type="text"
        placeholder="🔍︎ Buscar por nombre o descripción..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setFiltrotexto(e.target.value);
        }}
      />
      <X
        className="hover:text-primary/80 absolute top-[10px] right-2 cursor-pointer"
        visibility={busqueda == "" ? "hidden" : "visible"}
        size={20}
        onClick={() => {
          setBusqueda("");
          setFiltrotexto("");
        }}
      />
    </div>
  );
}

export default InputBusqueda;
