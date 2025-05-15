"use client";
import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Card } from "@/components/ui/card";
import { Local } from "@/data/tipos";

interface PropType {
  locales: Local[];
}

function MapaGoogle(props: PropType) {
  const locales = props.locales;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <Card className="flex aspect-square w-[300px] px-2 py-2 md:w-[600px]">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: locales[0].latitud, lng: locales[0].longitud }}
          defaultZoom={15}
          gestureHandling="greedy"
          id="map"
          streetViewControl={false}
        />
        {locales.map((local) => (
          <Marker
            key={local.id}
            position={{ lat: local.latitud, lng: local.longitud }}
            title={local.nombre}
          />
        ))}
      </APIProvider>
    </Card>
  );
}

export default MapaGoogle;
