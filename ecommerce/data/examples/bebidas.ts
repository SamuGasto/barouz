import limonadaMenta from "@/images/products-example/bebidas.webp";
import jugoFrambuesa from "@/images/products-example/smothie-frutilla.webp";
import smoothieMango from "@/images/products-example/smothie-chocolate.webp";
import jugoCitricos from "@/images/products-example/jugo-naranja.webp";
import { Producto } from "../tipos";

const bebidas: Producto[] = [
  {
    id: 25,
    nombre: "Limonada Menta",
    precio: 2200,
    en_promocion: true,
    precio_promocion: 2000,
    imagen: limonadaMenta,
    categoria: "Bebidas",
    descripcion: "Refrescante limonada natural con hojas de menta.",
    disponible: true,
  },
  {
    id: 26,
    nombre: "Jugo de Frambuesa",
    precio: 2300,
    en_promocion: false,
    precio_promocion: 2300,
    imagen: jugoFrambuesa,
    categoria: "Bebidas",
    descripcion: "Jugo exprimido de frambuesas frescas.",
    disponible: true,
  },
  {
    id: 27,
    nombre: "Smoothie de Mango",
    precio: 2500,
    en_promocion: true,
    precio_promocion: 2200,
    imagen: smoothieMango,
    categoria: "Bebidas",
    descripcion: "Smoothie cremoso de mango natural sin azúcar añadida.",
    disponible: true,
  },
  {
    id: 29,
    nombre: "Jugo Cítrico Mix",
    precio: 2400,
    en_promocion: true,
    precio_promocion: 2100,
    imagen: jugoCitricos,
    categoria: "Bebidas",
    descripcion: "Jugo de naranja, limón y pomelo recién exprimido.",
    disponible: true,
  },
];

export default bebidas;
