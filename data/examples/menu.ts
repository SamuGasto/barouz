import { StaticImageData } from "next/image";
import waffle from "@/images/products-example/waffle.jpg";
import heladoArtesanal from "@/images/products-example/helado-artesanal.jpg";
import churros from "@/images/products-example/churros.jpg";
import waffleCookies from "@/images/products-example/waffle-cookie.jpg";
import postres from "@/images/products-example/postres.jpg";
import bebidas from "@/images/products-example/bebidas.jpg";

type Menu = {
  nombre: string;
  imagen: StaticImageData;
};
const menu: Menu[] = [
  {
    nombre: "Waffles",
    imagen: waffle,
  },
  {
    nombre: "Helados",
    imagen: heladoArtesanal,
  },
  {
    nombre: "Churros",
    imagen: churros,
  },
  {
    nombre: "Waffles Cookies",
    imagen: waffleCookies,
  },
  {
    nombre: "Postres",
    imagen: postres,
  },
  {
    nombre: "Bebidas",
    imagen: bebidas,
  },
];

export default menu;
