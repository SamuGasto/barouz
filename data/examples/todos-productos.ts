import { Producto } from "./productos-promociones";
import waffles_cookies from "./cookies";
import waffles from "./waffles";
import helados from "./helados";
import churros from "./churros";

const todosLosProductos: Producto[] = [
  ...waffles_cookies,
  ...waffles,
  ...helados,
  ...churros,
];

export default todosLosProductos;
