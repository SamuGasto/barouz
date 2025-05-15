export function setCentroMapa(lat: number, lng: number) {
  const map = new google.maps.Map(document.getElementById("map")!, {
    center: { lat, lng },
    zoom: 15,
    streetViewControl: false,
  });
}
