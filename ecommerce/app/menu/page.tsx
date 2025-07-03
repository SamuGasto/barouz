import Populares from "@/components/pagina-menu/populares/populares";
import Menu from "@/components/pagina-menu/todo-menu/menu";
import Banner from "@/components/pagina-menu/banner";

export default async function Home() {
  return (
    <div className="mb-6 flex w-full flex-col items-center gap-6">
      <Banner />
      <Menu />
    </div>
  );
}
