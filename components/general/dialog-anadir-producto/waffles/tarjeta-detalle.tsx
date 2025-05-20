import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DetalleExtra, Extra, Pedido } from "@/data/tipos";

interface PropType {
  pedido: Pedido;
  extra: Extra;
  setExtra: (extra: Extra[]) => void;
}

const opacity_disabled = "opacity-50";
const opacity_enabled = "opacity-100";

const cursor_disabled = "cursor-default";
const cursor_enabled = "cursor-pointer";

function TarjetaExtra(props: PropType) {
  const { pedido, extra, setExtra } = props;
  function SetDetalle(
    extra: Extra,
    nuevoDetalle: DetalleExtra,
    operacionCantidadActual: number,
  ) {
    const nuevoExtra: Extra[] = pedido.extras.map((item) => {
      if (item.nombre === extra.nombre) {
        return {
          ...item,
          cantidad_actual: item.cantidad_actual + operacionCantidadActual,
          detalle: item.detalle.map((detalle) => {
            if (detalle.nombre === nuevoDetalle.nombre) {
              return {
                ...detalle,
                cantidad: nuevoDetalle.cantidad,
              };
            }
            return detalle;
          }),
        };
      }
      return item;
    });

    setExtra(nuevoExtra);
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div id="titulo" className="flex flex-col items-start">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-left text-lg font-semibold">{extra.nombre}</h2>
          <p>({extra.cantidad_actual})</p>
        </div>
        <p className="text-left text-sm font-light">
          Se pueden seleccionar hasta dos opciones.
        </p>
      </div>
      <div id="opciones" className="flex flex-wrap items-start gap-2">
        {extra.detalle.map((detalle) => (
          <Card
            key={detalle.nombre}
            className={
              "flex flex-row items-center gap-3 px-2 py-0 " +
              (extra.cantidad_actual >= 2 && detalle.cantidad === 0
                ? opacity_disabled
                : opacity_enabled)
            }
          >
            {extra.tipo === "checkbox" && (
              <input
                className={
                  "my-2 h-4 w-4 " +
                  (extra.cantidad_actual >= 2 && detalle.cantidad === 0
                    ? cursor_disabled
                    : cursor_enabled)
                }
                type="checkbox"
                disabled={extra.cantidad_actual >= 2 && detalle.cantidad === 0}
                onChange={(e) => {
                  const newDetalle = {
                    ...detalle,
                    cantidad: e.target.checked ? 1 : 0,
                  };

                  SetDetalle(extra, newDetalle, e.target.checked ? 1 : -1);
                }}
              />
            )}
            <label className="text-left text-sm font-normal">
              {detalle.nombre}
            </label>
            {extra.tipo === "incremental" && (
              <div className="flex h-fit w-fit flex-row items-center gap-1 py-0">
                <Button
                  className="h-8 w-8"
                  disabled={
                    detalle.cantidad === 0 ||
                    (extra.cantidad_actual >= 2 && detalle.cantidad === 0)
                  }
                  onClick={() => {
                    const newDetalle = {
                      ...detalle,
                      cantidad: detalle.cantidad - 1,
                    };

                    if (newDetalle.cantidad >= 0) {
                      SetDetalle(extra, newDetalle, -1);
                    }
                  }}
                  variant={"ghost"}
                >
                  -
                </Button>
                <p>{detalle.cantidad}</p>
                <Button
                  className="h-8 w-8"
                  disabled={
                    extra.cantidad_actual >= 2 || detalle.cantidad === 2
                  }
                  onClick={() => {
                    const newDetalle = {
                      ...detalle,
                      cantidad: detalle.cantidad + 1,
                    };

                    if (newDetalle.cantidad <= 2) {
                      SetDetalle(extra, newDetalle, 1);
                    }
                  }}
                  variant={"ghost"}
                >
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
