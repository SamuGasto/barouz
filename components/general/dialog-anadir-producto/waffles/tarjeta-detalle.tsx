import React from "react";
import extras_waffle from "@/data/extras-waffle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Extra } from "@/data/tipos";

interface PropType {
  extra: Extra;
}

function TarjetaExtra(props: PropType) {
  const { extra } = props;

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div id="titulo" className="flex flex-col items-start">
        <h2 className="text-left text-lg font-semibold">{extra.nombre}</h2>
        <p className="text-left text-sm font-light">
          Se pueden seleccionar hasta dos opciones.
        </p>
      </div>
      <div id="opciones" className="flex flex-wrap items-start gap-2">
        {extra.detalle.map((detalle) => (
          <Card
            key={detalle.nombre}
            className="flex flex-row items-center gap-3 px-2 py-0"
          >
            {extra.tipo === "checkbox" && <input type="checkbox" />}
            <label className="text-left text-sm font-normal">
              {detalle.nombre}
            </label>
            {extra.tipo === "incremental" && (
              <div className="flex h-fit w-fit flex-row items-center gap-1 py-0">
                <Button onClick={() => {}} variant={"ghost"}>
                  -
                </Button>
                <p>{detalle.cantidad}</p>
                <Button onClick={() => {}} variant={"ghost"}>
                  +
                </Button>
              </div>
            )}
            <p className="text-brand-primary text-right text-sm font-normal">
              ${detalle.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TarjetaExtra;
