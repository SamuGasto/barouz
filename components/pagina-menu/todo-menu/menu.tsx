import menu from "@/data/examples/menu";
import React from "react";
import CarruselDeProductos from "../carrusel-de-productos";
import obtenerTodosLosProductos from "@/utils/querys/servidor/todos-productos";

const colores: { [key: number]: string } = {
  1: "bg-brand-background-1",
  2: "bg-brand-background-2",
  3: "bg-brand-background-3",
  4: "bg-brand-background-4",
  5: "bg-brand-background-5",
  6: "bg-brand-background-6",
};

async function Menu() {
  const productos = await obtenerTodosLosProductos();

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {menu.map((item, index) => (
        <div
          key={item.nombre}
          className={
            colores[index + 1] +
            " items-left justify-left flex w-full flex-col gap-0 p-8"
          }
        >
          <div className="items-left justify-left flex flex-col gap-2">
            <h2 className="text-4xl font-thin">{item.nombre}</h2>
          </div>
          <div className="w-full rounded-xl p-4 md:ml-10 md:w-11/12 md:p-0 dark:shadow-none">
            <CarruselDeProductos
              productos={productos.filter(
                (producto) => producto.categoria === item.nombre,
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
