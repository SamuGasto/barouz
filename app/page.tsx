import ProductCarousel from "@/components/pagina-principal/product-carousel";
import Promociones from "@/components/pagina-principal/promociones";
import Banner from "@/components/pagina-principal/banner";

export default async function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center gap-6">
        <Banner />
        <ProductCarousel />
        <Promociones />
      </main>
    </>
  );
}
