import { map } from "./init-map";

export function setCentroMapa(lat: number, lng: number) {
  map.moveCamera({
    center: { lat, lng },
    zoom: 15,
  });
}
