import Banner from "@/components/pagina-promociones/banner";
import CarruselCupones from "@/components/general/carrusel-cupones";
import TodosProductos from "@/components/pagina-promociones/todos-productos";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Banner />
      <div className="w-full max-w-5xl rounded-xl p-4 md:w-3/4 md:p-0 dark:shadow-none">
        <CarruselCupones />
      </div>
      <TodosProductos />
    </div>
  );
}
