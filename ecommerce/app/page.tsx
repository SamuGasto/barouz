
import Promociones from "@/components/pagina-principal/promociones/promociones";
import Banner from "@/components/pagina-principal/banner";
import Menu from "@/components/pagina-principal/menu/menu";

export default async function Home() {
  return (
    <><Banner />
      <Promociones />
      <Menu /></>
  );
}
