import Link from "next/link";
import Image from "next/image";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import { ThemeSwitcher } from "./theme-switcher";
import CarritoCompra from "./carrito-compra";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between items-center p-3 px-5 text-sm border-b-1">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <a href="/">
            <Image
              className="rounded-full"
              src={logo}
              alt="Logo"
              width={32}
              height={32}
            />
          </a>
          <a href="/">
            <Image src={logo_texto} alt="Logo" width={128} height={32} />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/menu" className="hover:underline">
            Menu
          </Link>
          <Link href="/ofertas" className="hover:underline">
            Ofertas
          </Link>
          <Link href="/mis-pedidos" className="hover:underline">
            Mis Pedidos
          </Link>
          <Link href="/locales" className="hover:underline">
            Locales
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CarritoCompra />
        <div className="flex border-1 rounded-md items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
