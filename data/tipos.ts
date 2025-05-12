import { StaticImageData } from "next/image";

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  en_promocion: boolean;
  precio_promocion: number;
  imagen: StaticImageData;
  categoria: string; // Waffle, Helado Artesanal, Churros, Waffle Cookies, Postres, Bebidas, Otros
  descripcion: string;
  disponible: boolean;
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
