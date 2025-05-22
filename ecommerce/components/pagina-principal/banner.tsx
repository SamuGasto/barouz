import React from "react";
import { Button } from "../ui/button";
import { Euphoria_Script } from "next/font/google";
import Link from "next/link";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

function Banner() {
  return (
    <div className="bg-brand-primary-background flex w-full flex-col items-center justify-center gap-4 p-10">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-6xl font-thin">
          Endulzamos sonrisas <br />{" "}
          <span
            className={
              euphoriaScript.className + " text-brand-primary text-8xl"
            }
          >
            de forma natural.
          </span>
        </h1>
        <p>
          Delicias hechas a mano, con ingredientes 100% naturales.{" "}
          <span className="italic">¡Dulce placer sin culpa!</span>
        </p>
      </div>
      <Link href="/menu">
        <Button
          className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 scale-100 p-7 text-2xl font-light shadow-lg transition-all hover:scale-105"
          size={"default"}
        >
          Pedir Ahora
        </Button>
      </Link>
    </div>
  );
}

export default Banner;
