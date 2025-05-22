import React from "react";
import { Euphoria_Script } from "next/font/google";

const euphoriaScript = Euphoria_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

function Banner() {
  return (
    <div className="bg-brand-background-2 flex w-full justify-center gap-2">
      <div className="flex w-full max-w-xl flex-col items-center justify-center gap-4 py-6">
        <h1
          className={euphoriaScript.className + " text-brand-primary text-8xl"}
        >
          Promociones
        </h1>
      </div>
    </div>
  );
}

export default Banner;
