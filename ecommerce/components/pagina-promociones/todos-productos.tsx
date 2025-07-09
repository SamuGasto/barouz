
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { TarjetaCupon } from "./tarjeta-cupon";

async function TodosProductos() {
  const supabase = await createClient();
  const { data: todasLasPromociones, error } = await supabase.from("cupon").select("*");

  if (error) {
    console.error("Error al obtener cupones:", error);
    throw error;
  }

  return (
    <>
      <section
        id="todos"
        className="mt-5 flex w-full flex-col items-center gap-6 bg-brand-background-3 py-4"
      >
        <div className="items-center justify-center flex flex-col gap-2 ">
          <h2 className="text-4xl text-center font-thin">Todas las promociones</h2>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-1 px-2 py-12 md:gap-4 md:px-4 lg:px-6">
          {todasLasPromociones.map((item) => (
            <TarjetaCupon key={item.id} cupon={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default TodosProductos;
