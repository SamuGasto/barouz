"use client";
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Card } from "@/components/ui/card";
import { Local } from "@/data/tipos";
import initMap from "@/utils/mapa/init-map";

interface PropType {
  locales: Local[];
}

function MapaGoogle(props: PropType) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <Card className="flex aspect-square w-[300px] px-2 py-2 md:w-[600px]">
      <APIProvider apiKey={apiKey}>
        <Map

          style={{ width: "100%", height: "100%" }}
          defaultZoom={15}
          gestureHandling="greedy"
          id="map"
          streetViewControl={false}
          onTilesLoaded={() => {
            initMap(props.locales);
          }}
        >
        </Map>
      </APIProvider>
    </Card>
  );
}

export default MapaGoogle;
