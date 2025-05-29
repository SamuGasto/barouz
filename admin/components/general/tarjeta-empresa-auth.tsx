"use client";
import { Euphoria_Script } from "next/font/google";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

function TarjetaEmpresaAuth() {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center bg-brand-background-3">
          <div className="flex flex-col gap-4 items-center">
            <h1 className={euphoriaScript.className + " text-7xl md:text-9xl font-medium text-brand-primary"}>Barouz</h1>
            <p className="text-2xl md:text-4xl text-muted-foreground font-thin">Administración</p>
          </div>
        </div>
    )
}

export default TarjetaEmpresaAuth