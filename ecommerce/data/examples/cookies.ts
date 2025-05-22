import waffleCookieClasico from "@/images/products-example/waffle-cookie.webp";
import waffleCookieNutella from "@/images/products-example/waffle-cokies.webp";
import waffleCookieHelado from "@/images/products-example/waffle-helado.webp";
import { Producto } from "../tipos";

const waffles_cookies: Producto[] = [
  {
    id: 31,
    nombre: "Waffle Cookie Clásico",
    precio: 2200,
    en_promocion: false,
    precio_promocion: 2200,
    imagen: waffleCookieClasico,
    categoria: "Waffles Cookies",
    descripcion: "Waffle suave con trozos de galleta de chocolate clásico.",
    disponible: true,
  },
  {
    id: 32,
    nombre: "Waffle Cookie con Nutella",
    precio: 2500,
    en_promocion: true,
    precio_promocion: 2300,
    imagen: waffleCookieNutella,
    categoria: "Waffles Cookies",
    descripcion: "Delicioso waffle cookie con cobertura de nutella.",
    disponible: true,
  },
  {
    id: 33,
    nombre: "Waffle Cookie con Helado",
    precio: 2900,
    en_promocion: false,
    precio_promocion: 2900,
    imagen: waffleCookieHelado,
    categoria: "Waffles Cookies",
    descripcion: "Waffle cookie acompañado de una bola de helado artesanal.",
    disponible: true,
  },
];

export default waffles_cookies;
