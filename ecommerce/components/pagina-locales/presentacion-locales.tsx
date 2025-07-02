"use client";
import React from "react";
import MapaGoogle from "./mapa";
import Locales from "./locales";
import { Local } from "@/data/tipos";

function PresentacionLocales() {
  const [locales, setLocales] = React.useState<Local[]>([]);

  React.useEffect(() => {
    const fetchLocal = async () => {
      const locales: Local[] = [];
      setLocales(locales);
    };
    fetchLocal();
  }, []);


  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-10 md:flex-row">
      <Locales locales={locales} />
      <MapaGoogle locales={locales} />
    </div>
  );
}

export default PresentacionLocales;
