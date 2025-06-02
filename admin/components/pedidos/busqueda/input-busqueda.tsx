"use client";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  searchTerm: string
  onSearchChange: (value: string) => void
}

function InputBusqueda({ searchTerm, onSearchChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4  " />
        <Input
          type="search"
          placeholder="Buscar pedidos por número, cliente o producto..."
          className="pl-8 w-full md:w-[300px] "
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default InputBusqueda;
