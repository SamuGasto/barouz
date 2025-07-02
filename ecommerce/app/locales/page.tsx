import Banner from "@/components/pagina-locales/banner";
import PresentacionLocales from "@/components/pagina-locales/presentacion-locales";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Banner />
      <PresentacionLocales />
    </div>
  );
}
