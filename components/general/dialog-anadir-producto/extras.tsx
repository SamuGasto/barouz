import React from "react";
import { Euphoria_Script } from "next/font/google";
import { CategoriaProducto, Extra, Pedido } from "@/data/tipos";
import TarjetaExtra from "./waffles/tarjeta-detalle";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

interface PropType {
  pedido: Pedido;
  extra: Extra[];
  setExtra: (extra: Extra[]) => void;
}

function Extras(props: PropType) {
  const { pedido, extra, setExtra } = props;

  if (extra.length === 0) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h2
        className={euphoriaScript.className + " text-center text-5xl font-thin"}
      >
        Extras
      </h2>
      <div className="flex w-full flex-col items-center gap-5">
        {extra.map((item) => (
          <TarjetaExtra
            key={item.nombre}
            pedido={pedido}
            extra={item}
            setExtra={setExtra}
          />
        ))}
      </div>
    </div>
  );
}

export default Extras;
