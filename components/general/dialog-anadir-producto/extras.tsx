import React from "react";
import { Euphoria_Script } from "next/font/google";
import { CategoriaProducto, Extra } from "@/data/tipos";
import TarjetaExtra from "./waffles/tarjeta-detalle";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

interface PropType {
  categoria: CategoriaProducto;
  extra: Extra[];
  setExtra: (extra: Extra[]) => void;
}

function Extras(props: PropType) {
  const { categoria, extra, setExtra } = props;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h2
        className={euphoriaScript.className + " text-center text-5xl font-thin"}
      >
        Extras
      </h2>
      {extra.map((item) => (
        <TarjetaExtra key={item.nombre} extra={item} />
      ))}
    </div>
  );
}

export default Extras;
