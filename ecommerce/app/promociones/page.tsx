import Banner from "@/components/pagina-promociones/banner";
import CarruselPromociones from "@/components/pagina-promociones/carrusel";
import TodosProductos from "@/components/pagina-promociones/todos-productos";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-6">
      <Banner />
      <CarruselPromociones />
      <TodosProductos />
    </main>
  );
}
