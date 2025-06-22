import Link from "next/link";
import Image from "next/image";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import { ThemeSwitcher } from "./theme-switcher";
import CarritoCompra from "./carrito-compra";

// Navbar debe permanecer como Server Component para SEO y performance.
const Navbar = () => {
  return (
    <nav
      className="border-b-brand-primary flex w-full items-center justify-between border-b-1 p-3 px-5 text-sm bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-200"
      aria-label="Barra de navegación principal"
      role="navigation"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <a href="/" aria-label="Ir al inicio">
            <Image className="rounded-full shadow-md transition-all duration-200 hover:scale-110" src={logo} alt="Logo Barouz" width={32} />
          </a>
          <a href="/" aria-label="Ir al inicio">
            <Image className="transition-all duration-200 hover:scale-105" src={logo_texto} alt="Barouz" width={128} />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/menu" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 px-2 py-1 rounded-md transition-all duration-200" aria-label="Ver menú">
            Menu
          </Link>
          <Link href="/promociones" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 px-2 py-1 rounded-md transition-all duration-200" aria-label="Ver promociones">
            Promociones
          </Link>
          <Link href="/mis-pedidos" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 px-2 py-1 rounded-md transition-all duration-200" aria-label="Ver mis pedidos">
            Mis Pedidos
          </Link>
          <Link href="/locales" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 px-2 py-1 rounded-md transition-all duration-200" aria-label="Ver locales">
            Locales
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CarritoCompra />
        <div className="flex items-center rounded-md border-1">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
