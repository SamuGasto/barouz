import { StaticImageData } from "next/image";
import product_image_1 from "@/images/products-example/1.jpg";
import product_image_2 from "@/images/products-example/2.jpg";
import product_image_3 from "@/images/products-example/3.jpg";

export type ProductsCarruselPrincipal = {
  id: number;
  oferta_texto: string;
  oferta_termino: string;
  image: StaticImageData;
};

const products: ProductsCarruselPrincipal[] = [
  {
    id: 1,
    oferta_texto: "10% Descuento en Helados",
    oferta_termino: "20 de Mayo",
    image: product_image_1,
  },
  {
    id: 2,
    oferta_texto: "20% Descuento en Churros",
    oferta_termino: "26 de Mayo",
    image: product_image_2,
  },
  {
    id: 3,
    oferta_texto: "2x1 en Waffles",
    oferta_termino: "30 de Mayo",
    image: product_image_3,
  },
];

export default products;
