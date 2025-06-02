import heladoVainilla from "@/images/products-example/helado-sol.webp";
import heladoChocolate from "@/images/products-example/postres.webp";
import heladoFrutilla from "@/images/products-example/helado-frutilla.webp";
import heladoDoble from "@/images/products-example/helado-artesanal.webp";
import heladoVegano from "@/images/products-example/helado-menta.webp";
import heladoTopping from "@/images/products-example/helado-completo.webp";
import { Producto } from "../tipos";

const helados: Producto[] = [
  {
    id: 13,
    nombre: "Helado de Vainilla",
    precio: 2500,
    en_promocion: false,
    precio_promocion: 2500,
    imagen: heladoVainilla,
    categoria: "Helados",
    descripcion: "Helado cremoso de vainilla natural.",
    disponible: true,
  },
  {
    id: 14,
    nombre: "Helado de Chocolate",
    precio: 2600,
    en_promocion: true,
    precio_promocion: 2400,
    imagen: heladoChocolate,
    categoria: "Helados",
    descripcion: "Helado artesanal de chocolate con chips de cacao.",
    disponible: true,
  },
  {
    id: 15,
    nombre: "Helado de Frutilla",
    precio: 2600,
    en_promocion: false,
    precio_promocion: 2600,
    imagen: heladoFrutilla,
    categoria: "Helados",
    descripcion: "Helado natural con trozos de frutilla fresca.",
    disponible: true,
  },
  {
    id: 16,
    nombre: "Helado Doble Sabor",
    precio: 2900,
    en_promocion: true,
    precio_promocion: 2700,
    imagen: heladoDoble,
    categoria: "Helados",
    descripcion: "Combinación de dos sabores a elección.",
    disponible: true,
  },
  {
    id: 17,
    nombre: "Helado Vegano",
    precio: 3000,
    en_promocion: false,
    precio_promocion: 3000,
    imagen: heladoVegano,
    categoria: "Helados",
    descripcion: "Helado 100% vegetal, sin lactosa ni azúcar añadida.",
    disponible: true,
  },
  {
    id: 18,
    nombre: "Helado con Topping",
    precio: 3100,
    en_promocion: true,
    precio_promocion: 2800,
    imagen: heladoTopping,
    categoria: "Helados",
    descripcion: "Helado a elección con topping de galletas y caramelo.",
    disponible: true,
  },
];

export default helados;
