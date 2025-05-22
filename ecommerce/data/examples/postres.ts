import brownieClasico from "@/images/products-example/brownie.jpg";
import postreAvena from "@/images/products-example/postre-avena.jpg";
import { Producto } from "../tipos";

const postres: Producto[] = [
  {
    id: 37,
    nombre: "Brownie Clásico",
    precio: 2200,
    en_promocion: false,
    precio_promocion: 2200,
    imagen: brownieClasico,
    categoria: "Postres",
    descripcion: "Brownie de chocolate intenso, húmedo y esponjoso.",
    disponible: true,
  },
  {
    id: 38,
    nombre: "Postre de Avena",
    precio: 2800,
    en_promocion: true,
    precio_promocion: 2500,
    imagen: postreAvena,
    categoria: "Postres",
    descripcion: "Postre deavena con cobertura de frutillas frescas.",
    disponible: true,
  },
];

export default postres;
