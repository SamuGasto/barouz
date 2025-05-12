import waffle from "@/images/products-example/waffle.jpg";
import waffleNutella from "@/images/products-example/waffle-nutella.jpg";
import heladoArtesanal from "@/images/products-example/helado-artesanal.jpg";
import churros from "@/images/products-example/churros.jpg";
import waffleCookie from "@/images/products-example/waffle-cookie.jpg";
import bebidas from "@/images/products-example/bebidas.jpg";
import { Producto } from "../tipos";

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Waffle",
    precio: 1500,
    en_promocion: false,
    precio_promocion: 1500,
    imagen: waffle,
    categoria: "Waffles",
    descripcion: "Un waffle clásico 100% natural.",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Waffle con Nutella Clásico",
    precio: 1650,
    en_promocion: false,
    precio_promocion: 1650,
    imagen: waffleNutella,
    categoria: "Waffles",
    descripcion: "Un waffle exquisito con nutella.",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Helado Artesanal",
    precio: 2800,
    en_promocion: false,
    precio_promocion: 2800,
    imagen: heladoArtesanal,
    categoria: "Helados",
    descripcion: "Un helado artesanal 100% natural.",
    disponible: true,
  },
  {
    id: 4,
    nombre: "Churros",
    precio: 2500,
    en_promocion: false,
    precio_promocion: 2500,
    imagen: churros,
    categoria: "Churros",
    descripcion: "Un churro exquisito con chocolate.",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Waffle Cookie",
    precio: 2000,
    en_promocion: false,
    precio_promocion: 2000,
    imagen: waffleCookie,
    categoria: "Waffles Cookies",
    descripcion: "Un waffle exquisito con cookies.",
    disponible: true,
  },
  {
    id: 6,
    nombre: "Limonada",
    precio: 2000,
    en_promocion: false,
    precio_promocion: 2000,
    imagen: bebidas,
    categoria: "Bebidas",
    descripcion: "Un jugo de limonada exquisito. Verdaderamente",
    disponible: true,
  },
];

export default productos;
