import waffleFrutilla from "@/images/products-example/waffle-frutilla.jpg";
import waffleManjar from "@/images/products-example/waffle-nutella.jpg";
import waffleChocoBlanco from "@/images/products-example/waffle-basico.jpg";
import waffleHelado from "@/images/products-example/waffle-helado.jpg";
import waffleMermelada from "@/images/products-example/waffle-crema.jpg";
import miniWaffleTrio from "@/images/products-example/waffle-nutella.jpg";
import { Producto } from "../tipos";

const waffles: Producto[] = [
  {
    id: 7,
    nombre: "Waffle con Frutilla",
    precio: 1800,
    en_promocion: true,
    precio_promocion: 1600,
    imagen: waffleFrutilla, // Asegúrate de importar esta imagen
    categoria: "Waffles",
    descripcion: "Waffle cubierto con frutillas frescas y crema.",
    disponible: true,
  },
  {
    id: 8,
    nombre: "Waffle con Manjar",
    precio: 1700,
    en_promocion: false,
    precio_promocion: 1700,
    imagen: waffleManjar,
    categoria: "Waffles",
    descripcion: "Waffle relleno con dulce de leche artesanal.",
    disponible: true,
  },
  {
    id: 9,
    nombre: "Waffle de Chocolate Blanco",
    precio: 1900,
    en_promocion: true,
    precio_promocion: 1700,
    imagen: waffleChocoBlanco,
    categoria: "Waffles",
    descripcion: "Waffle bañado en chocolate blanco belga.",
    disponible: true,
  },
  {
    id: 10,
    nombre: "Waffle con Helado",
    precio: 2200,
    en_promocion: false,
    precio_promocion: 2200,
    imagen: waffleHelado,
    categoria: "Waffles",
    descripcion: "Waffle caliente con bola de helado artesanal.",
    disponible: true,
  },
  {
    id: 11,
    nombre: "Waffle con Mermelada",
    precio: 1600,
    en_promocion: false,
    precio_promocion: 1600,
    imagen: waffleMermelada,
    categoria: "Waffles",
    descripcion: "Waffle acompañado con mermelada casera de frutos rojos.",
    disponible: true,
  },
  {
    id: 12,
    nombre: "Mini Waffle Trío",
    precio: 2000,
    en_promocion: true,
    precio_promocion: 1800,
    imagen: miniWaffleTrio,
    categoria: "Waffles",
    descripcion:
      "Tres mini waffles con diferentes toppings: manjar, frutilla y nutella.",
    disponible: true,
  },
];

export default waffles;
