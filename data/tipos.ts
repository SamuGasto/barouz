import { StaticImageData } from "next/image";

export type CategoriaProducto =
  | "Waffles"
  | "Helados"
  | "Churros"
  | "Waffles Cookies"
  | "Postres"
  | "Bebidas"
  | "Otros";

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  en_promocion: boolean;
  precio_promocion: number;
  imagen: StaticImageData;
  categoria: CategoriaProducto;
  descripcion: string;
  disponible: boolean;
};

export type DetalleExtra = {
  nombre: string;
  cantidad: number;
  precio: number;
};

export type Extra = {
  nombre: string;
  tipo: "incremental" | "checkbox";
  cantidad_actual: number;
  detalle: DetalleExtra[];
};

export type Pedido = {
  id: string;
  producto_id: number;
  cantidad: number;
  extras: Extra[];
  precio_final: number;
};

export type Carrusel = {
  id: string;
  nombre: string;
};

export type Oferta = {
  id: string;
  oferta_texto: string;
  oferta_termino: string;
  image: StaticImageData;
};

export type Oferta_Carrusel = {
  id: string;
  oferta_id: number;
  carrusel_id: number;
};

export type Ubicacion = {
  id: string;
  lugar: string; // Promociones (Menu), Ofertas
};

export type Producto_Ubicacion = {
  id: string;
  producto_id: number;
  ubicacion_id: string;
};

export type Promocion = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: StaticImageData;
  tipo_de_descuento: "Porcentaje" | "Precio"; // Si el descuento es porcentaje, el valor_descuento es el porcentaje. Si el descuento es precio, el valor_descuento es el precio final.
  valor_descuento: number;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  disponible: boolean;
};

export type Producto_Promocion = {
  id: string;
  producto_id: number;
  promocion_id: string;
};

export type Horario = {
  id: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
};

export type Local = {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horarios: Horario[];
  latitud: number;
  longitud: number;
};
