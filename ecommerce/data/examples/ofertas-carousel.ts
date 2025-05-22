import product_image_1 from "@/images/products-example/1.webp";
import product_image_2 from "@/images/products-example/2.webp";
import product_image_3 from "@/images/products-example/3.webp";
import { Oferta } from "../tipos";

export const ofertas_carrusel_principal: Oferta[] = [
  {
    id: "1",
    oferta_texto: "10% Descuento en Helados",
    oferta_termino: "20 de Mayo",
    image: product_image_1,
  },
  {
    id: "2",
    oferta_texto: "20% Descuento en Churros",
    oferta_termino: "26 de Mayo",
    image: product_image_2,
  },
  {
    id: "3",
    oferta_texto: "2x1 en Waffles",
    oferta_termino: "30 de Mayo",
    image: product_image_3,
  },
];

export const ofertas_carrusel_ofertas: Oferta[] = ofertas_carrusel_principal;
