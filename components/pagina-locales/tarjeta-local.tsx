"use client";
import React from "react";
import { Local } from "@/data/tipos";
import { Card } from "../ui/card";
import { MapPin } from "lucide-react";
import { setCentroMapa } from "@/utils/mapa/definir-centro";

interface PropType {
  local: Local;
}

function TarjetaLocal(props: PropType) {
  const local = props.local;
  console.log(local);

  return (
    <Card
      className="items-left flex aspect-[16/5] w-fit min-w-[200px] flex-col justify-center gap-2 px-4 py-4 transition-all hover:scale-102 hover:cursor-pointer"
      onClick={() => setCentroMapa(local.latitud, local.longitud)}
    >
      <h3 className="text-2xl font-semibold">{local.nombre}</h3>
      <div className="flex flex-row items-center gap-2">
        <MapPin className="h-6 w-6" />
        <p className="text-sm font-light">{local.direccion}</p>
      </div>
    </Card>
  );
}

export default TarjetaLocal;
