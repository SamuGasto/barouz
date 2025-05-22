import MenuFiltrado from "@/components/pagina-menu-filtro/menu-filtrado";
import Banner from "@/components/pagina-menu-filtro/banner";

export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-6">
      <Banner />
      <MenuFiltrado />
    </main>
  );
}
