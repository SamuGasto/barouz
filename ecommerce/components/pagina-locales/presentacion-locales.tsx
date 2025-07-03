"use client";
import React from "react";
import MapaGoogle from "./mapa";
import Locales from "./locales";
import { useLocales } from "@/hooks/useLocales";
import { Loader2 } from "lucide-react";

function PresentacionLocales() {
  const { data: locales, isLoading } = useLocales();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-10 md:flex-row">
      {isLoading ? (
        <Loader2 className="h-12 w-12 animate-spin" />
      ) : (
        <>
          <Locales locales={locales || []} />
          <MapaGoogle locales={locales || []} />
        </>
      )}
    </div>
  );
}

export default PresentacionLocales;
