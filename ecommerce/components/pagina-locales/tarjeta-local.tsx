"use client";
import React from "react";
import { Card } from "../ui/card";
import { MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { setCentroMapa } from "@/utils/mapa/definir-centro";
import { LocalRow } from "@/types/resumen-tipos";
import { useHorarios } from "@/hooks/useHorarios";
import { Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface PropType {
  local: LocalRow;
}

function TarjetaLocal(props: PropType) {
  const local = props.local;
  const { data: horarios, isLoading } = useHorarios();
  const formatTime = (time: string) => {
    const hour = time.split("-")[0];
    const minutes = time.split(":")[1];
    return `${hour}:${minutes}`;
  }
  return (
    <Card
      className="items-left flex w-full flex-col justify-center gap-2 px-4 py-4 transition-all hover:scale-102 hover:cursor-pointer"
      onClick={() => { setCentroMapa(local.latitud, local.longitud) }}
    >
      <div className="items-left flex w-fit flex-col gap-2">
        <h3 className="text-2xl font-semibold">{local.nombre}</h3>
        <div className="flex flex-row items-center gap-2">
          <MapPin className="h-6 w-6" />
          <p className="text-sm font-light">{local.direccion}</p>
        </div>
      </div>
      <Separator />
      <div className="items-left flex w-fit flex-wrap gap-3">
        {isLoading ? (
          <Loader2 className="h-12 w-12 animate-spin" />
        ) : (
          <>
            {horarios && <Accordion type="multiple" className="w-full">
              <AccordionItem key={local.id} value={local.id.toString()} >
                <AccordionTrigger>
                  Horarios
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap items-center gap-2">
                    {horarios?.map((horario) => {
                      if (horario.local_id === local.id) {
                        return (

                          <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-semibold">{horario.dia}</p>
                            <p className="text-sm font-light">
                              {horario.hora_inicio.toString()}
                              <br />
                              {horario.hora_fin}
                            </p>
                          </div>

                        );
                      }
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>}
          </>
        )}
      </div>
    </Card>
  );
}

export default TarjetaLocal;
