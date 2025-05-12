import waffles_cookies from "./cookies";
import waffles from "./waffles";
import helados from "./helados";
import churros from "./churros";
import postres from "./postres";
import bebidas from "./bebidas";
import { Producto } from "../tipos";

const todosLosProductos: Producto[] = [
  ...waffles_cookies,
  ...waffles,
  ...helados,
  ...churros,
  ...postres,
  ...bebidas,
];

export default todosLosProductos;
