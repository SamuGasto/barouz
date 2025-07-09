import React from "react";
import CarruselDeProductos from "../../general/carrusel-de-productos";
import { Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { CategoriaProductos } from "@/types/resumen-tipos";
import { cn } from "@/lib/utils";

const colores: { [key: number]: string } = {
  1: "bg-brand-background-1",
  2: "bg-brand-background-2",
  3: "bg-brand-background-3",
  4: "bg-brand-background-4",
  5: "bg-brand-background-5",
  6: "bg-brand-background-6",
};

const Categorias: CategoriaProductos[] = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffle Cookies",
  "Postres",
  "Bebidas",
  "Otros",
];

async function Menu() {
  const supabase = await createClient();
  const { data: productos, error } = await supabase.from("producto").select("*");

  if (error || !productos) {
    return <Loader2 className="h-12 w-12 animate-spin" />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {Categorias.map((item, index) => (
        <div
          key={item}
          className={cn(
            colores[index + 1],
            " items-left justify-left flex w-full flex-col gap-0 p-8"
          )}
        >
          <div className="items-left justify-left flex flex-col gap-2">
            <h2 id={item} className="text-4xl font-thin">
              <a href={`#${item}`}>{item}</a>
            </h2>
          </div>
          <div className="w-full rounded-xl p-4 md:ml-10 md:w-11/12 md:p-0 dark:shadow-none">
            <CarruselDeProductos
              productos={productos.filter(
                (producto) => producto.categoria === item,
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
