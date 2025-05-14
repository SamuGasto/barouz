import Banner from "@/components/pagina-locales/banner";
import PresentacionLocales from "@/components/pagina-locales/presentacion-locales";

export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-6">
      <Banner />
      <PresentacionLocales />
    </main>
  );
}
