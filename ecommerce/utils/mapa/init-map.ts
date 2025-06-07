import { Local } from "@/data/tipos";

export let map: google.maps.Map;
export let marcadores: google.maps.marker.AdvancedMarkerElement[] = [];

async function initMap(locales: Local[]) {
  // Request needed libraries.
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: locales[0].latitud, lng: locales[0].longitud },
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });

  locales.forEach((local) => {
    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: local.latitud, lng: local.longitud },
    });
    marcadores.push(marker);
  });
}

export default initMap;
