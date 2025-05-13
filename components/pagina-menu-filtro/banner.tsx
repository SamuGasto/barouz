import React from "react";
import { Euphoria_Script } from "next/font/google";
import BuscadorMenu from "./buscador/buscador-menu";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

function Banner() {
  return (
    <div className="bg-brand-background-1 flex w-full justify-center gap-2">
      <div className="flex w-full max-w-xl flex-col items-center justify-center gap-2 py-6">
        <h1
          className={euphoriaScript.className + " text-brand-primary text-8xl"}
        >
          Menú
        </h1>
        <BuscadorMenu />
      </div>
    </div>
  );
}

export default Banner;
