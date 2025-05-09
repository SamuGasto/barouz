"use client";
import React from "react";
import { Euphoria_Script } from "next/font/google";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

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
        <p className="text-brand-primary text-center font-light">
          Descubre nuestros deliciosos productos <br />
          Si necesitas una busqueda avanzada...
        </p>
        <Button
          onClick={() => {
            redirect("/menu-filtro");
          }}
          className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 mt-4 scale-100 p-7 text-2xl font-light shadow-lg transition-all hover:scale-105"
        >
          Comenzar búsqueda
        </Button>
      </div>
    </div>
  );
}

export default Banner;
