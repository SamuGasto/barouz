import { StaticImageData } from "next/image";
import waffle from "@/images/products-example/waffle.webp";
import heladoArtesanal from "@/images/products-example/helado-artesanal.webp";
import churros from "@/images/products-example/churros.webp";
import waffleCookies from "@/images/products-example/waffle-cookie.webp";
import postres from "@/images/products-example/postres.webp";
import bebidas from "@/images/products-example/bebidas.webp";
import { Producto } from "../tipos";
import todos_waffles from "./waffles";
import todos_helados from "./helados";
import todos_churros from "./churros";
import todos_cookies from "./cookies";
import todos_postres from "./postres";
import todos_bebidas from "./bebidas";

type Menu = {
  nombre: string;
  imagen: StaticImageData;
  productos: Producto[];
};
const menu: Menu[] = [
  {
    nombre: "Waffles",
    imagen: waffle,
    productos: todos_waffles,
  },
  {
    nombre: "Helados",
    imagen: heladoArtesanal,
    productos: todos_helados,
  },
  {
    nombre: "Churros",
    imagen: churros,
    productos: todos_churros,
  },
  {
    nombre: "Waffle Cookies",
    imagen: waffleCookies,
    productos: todos_cookies,
  },
  {
    nombre: "Postres",
    imagen: postres,
    productos: todos_postres,
  },
  {
    nombre: "Bebidas",
    imagen: bebidas,
    productos: todos_bebidas,
  },
];

export default menu;
