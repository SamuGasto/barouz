import churroClasico from "@/images/products-example/churros-artesanales.webp";
import churroManjar from "@/images/products-example/churros.webp";
import churroChocolate from "@/images/products-example/churros-chocolate.webp";
import churrosTrio from "@/images/products-example/muchos-churros.webp";
import churrosMini from "@/images/products-example/churros-docena.webp";
import { Producto } from "../tipos";

const churros: Producto[] = [
  {
    id: 19,
    nombre: "Churro Clásico",
    precio: 2000,
    en_promocion: false,
    precio_promocion: 2000,
    imagen: churroClasico,
    categoria: "Churros",
    descripcion: "Churro tradicional espolvoreado con azúcar.",
    disponible: true,
  },
  {
    id: 20,
    nombre: "Churro con Manjar",
    precio: 2200,
    en_promocion: true,
    precio_promocion: 2000,
    imagen: churroManjar,
    categoria: "Churros",
    descripcion: "Churro relleno con manjar casero.",
    disponible: true,
  },
  {
    id: 21,
    nombre: "Churro con Chocolate",
    precio: 2300,
    en_promocion: false,
    precio_promocion: 2300,
    imagen: churroChocolate,
    categoria: "Churros",
    descripcion: "Churro bañado en chocolate caliente.",
    disponible: true,
  },
  {
    id: 22,
    nombre: "Churros Rellenos Trío",
    precio: 3000,
    en_promocion: true,
    precio_promocion: 2700,
    imagen: churrosTrio,
    categoria: "Churros",
    descripcion: "Tres churros rellenos: manjar, nutella y frutilla.",
    disponible: true,
  },
  {
    id: 23,
    nombre: "Churros Mini",
    precio: 1800,
    en_promocion: false,
    precio_promocion: 1800,
    imagen: churrosMini,
    categoria: "Churros",
    descripcion: "Porción de mini churros para compartir.",
    disponible: true,
  },
];

export default churros;
