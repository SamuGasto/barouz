import React from "react";
import TarjetaPromocion from "./tarjeta-promocion";
import { Promocion } from "@/data/tipos";

async function TodosProductos() {
  const todasLasPromociones: Promocion[] = [];

  return (
    <>
      <section id="promociones" className="flex w-full items-center gap-6">
        <div
          className={
            "bg-brand-background-3 items-left justify-left flex w-full flex-col gap-0 p-8"
          }
        >
          <div className="items-left justify-left flex flex-col gap-2">
            <h2 className="text-4xl font-thin">Productos en oferta</h2>
          </div>
          <div className="w-full rounded-xl p-4 md:ml-10 md:w-11/12 md:p-0 dark:shadow-none">
            {/* <CarruselDeProductos productos={promocionesDestacadas} /> */}
          </div>
        </div>
      </section>
      <section
        id="todos"
        className="mt-5 flex w-full flex-col items-center gap-6"
      >
        <div className="items-left justify-left flex flex-col gap-2">
          <h2 className="text-4xl font-thin">Todas las promociones</h2>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-1 px-2 py-12 md:gap-4 md:px-4 lg:px-6">
          {todasLasPromociones.map((item) => (
            <TarjetaPromocion key={item.id} promocion={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default TodosProductos;
