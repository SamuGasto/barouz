import waffles from "./waffles";
import helados from "./helados";
import cookies from "./cookies";
import churros from "./churros";
import postres from "./postres";
import bebidas from "./bebidas";
import { Promocion } from "../tipos";
import imagenWafflePromo from "@/images/products-example/waffle-basico.webp";
import imagenHeladoPromo from "@/images/products-example/helado-artesanal.webp";
import imagenComboPromo from "@/images/products-example/churros.webp";
import imagenPostrePromo from "@/images/products-example/postres.webp";
import imagenGalletaPromo from "@/images/products-example/waffle-cookie.webp";

const promocionesDestacadas = [
  helados[0],
  cookies[0],
  waffles[0],
  bebidas[0],
  churros[0],
  postres[0],
];

export default promocionesDestacadas;

const promocion1: Promocion = {
  id: "promo-waffle-20",
  nombre: "20% en Waffles Dulces",
  descripcion:
    "Disfruta un 20% de descuento en todos nuestros waffles artesanales seleccionados.",
  imagen: imagenWafflePromo,
  tipo_de_descuento: "Porcentaje",
  valor_descuento: 20,
  fecha_inicio: "2025-05-01",
  fecha_fin: "2025-05-31",
  hora_inicio: "12:00",
  hora_fin: "22:00",
  disponible: true,
};

const productosWaffle = [1, 3, 5]; // IDs de waffles

const promocion2: Promocion = {
  id: "helado-happy-hour",
  nombre: "Happy Hour de Helados",
  descripcion:
    "¡Todos los helados artesanales a $1500 entre las 16:00 y 18:00 hrs!",
  imagen: imagenHeladoPromo,
  tipo_de_descuento: "Precio",
  valor_descuento: 1500,
  fecha_inicio: "2025-05-10",
  fecha_fin: "2025-05-31",
  hora_inicio: "16:00",
  hora_fin: "18:00",
  disponible: true,
};

const productosHelado = [6, 7, 8]; // IDs de helados

const promocion3: Promocion = {
  id: "combo-churro-bebida",
  nombre: "Combo Churro + Bebida",
  descripcion: "Llévate un churro y una bebida por solo $2500.",
  imagen: imagenComboPromo,
  tipo_de_descuento: "Precio",
  valor_descuento: 2500,
  fecha_inicio: "2025-05-01",
  fecha_fin: "2025-06-01",
  hora_inicio: "13:00",
  hora_fin: "23:00",
  disponible: true,
};

const productosCombo = [12, 21]; // Ejemplo: churro (id 12) + bebida (id 21)

const promocion4: Promocion = {
  id: "postre-regalo",
  nombre: "Postre Gratis por Compra Sobre $8000",
  descripcion: "Por compras superiores a $8000, elige un postre gratis.",
  imagen: imagenPostrePromo,
  tipo_de_descuento: "Precio", // Valor 0 = gratis
  valor_descuento: 0,
  fecha_inicio: "2025-05-15",
  fecha_fin: "2025-06-15",
  hora_inicio: "14:00",
  hora_fin: "22:00",
  disponible: true,
};

const productosGratis = [19]; // ID del postre gratuito

const promocion5: Promocion = {
  id: "noche-galleta",
  nombre: "2x1 en Waffle Cookies",
  descripcion: "¡Solo este viernes, lleva 2 Waffle Cookies por el precio de 1!",
  imagen: imagenGalletaPromo,
  tipo_de_descuento: "Porcentaje",
  valor_descuento: 50, // Cada uno al 50% para simular 2x1
  fecha_inicio: "2025-05-01",
  fecha_fin: "2025-06-30",
  hora_inicio: "18:00",
  hora_fin: "23:59",
  disponible: true,
};

const productosCookies = [10, 11]; // IDs de Waffle Cookies

export const todas_las_promociones = [
  promocion1,
  promocion2,
  promocion3,
  promocion4,
  promocion5,
];
