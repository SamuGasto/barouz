import { Local } from "@/data/tipos";
interface AdvancedMarkerElement {
  // Add any properties/methods you use from AdvancedMarkerElement
  position: google.maps.LatLng | google.maps.LatLngLiteral | null;
  map: google.maps.Map | null;
  // Add other methods/properties you use
  setMap(map: google.maps.Map | null): void;
  // ... other methods
}

declare global {
  namespace google.maps {
    // This extends the existing google.maps namespace
    let AdvancedMarkerElement: {
      prototype: AdvancedMarkerElement;
      new (options?: {
        map?: google.maps.Map;
        position?: google.maps.LatLng | google.maps.LatLngLiteral;
        content?: Node | null;
        title?: string;
        // Add other constructor options you need
      }): AdvancedMarkerElement;
    };
  }
}

export let map: google.maps.Map;
export let marcadores: AdvancedMarkerElement[] = [];

function injectPriceTagStyles() {
  if (document.getElementById("price-tag-style")) return; // Evita duplicados
  const style = document.createElement("style");
  style.id = "price-tag-style";
  style.textContent = `
    .price-tag {
      background-color: #4285F4;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 14px;
      padding: 10px 15px;
      position: relative;
    }
    .price-tag::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, 0);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #4285F4;
    }
  `;
  document.head.appendChild(style);
}

async function initMap(locales: Local[]) {
  // Request needed libraries.
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as unknown as {
    AdvancedMarkerElement: typeof google.maps.AdvancedMarkerElement;
  };

  injectPriceTagStyles();

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: locales[0].latitud, lng: locales[0].longitud },
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });

  locales.forEach((local, i) => {
    const pin = document.createElement("div");
    pin.className = "price-tag";
    pin.textContent = `${local.nombre}`;
    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: local.latitud, lng: local.longitud },
      title: local.nombre,
      content: pin,
    });
    marcadores.push(marker);
  });
}

export default initMap;
