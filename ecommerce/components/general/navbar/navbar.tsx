import Link from "next/link";
import Image from "next/image";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import CarritoCompra from "./carrito-compra";
import UserData from "./user-data";
import SideMenu from "./nav-bar-extend";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menu" },
  { href: "/promociones", label: "Promociones" },
  { href: "/mis-pedidos", label: "Mis Pedidos" },
  { href: "/locales", label: "Locales" },
];

// Navbar debe permanecer como Server Component para SEO y performance.
const Navbar = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between p-3 px-5">
      <SideMenu />
      <div id="navigation" className='hidden md:flex flex-row items-center gap-2'>
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image className="rounded-full" src={logo} alt="Logo" />
          <Image src={logo_texto} alt="Logo" />
        </Link>
        {links.map((link) => (
          <div key={link.href} className="flex flex-row items-center gap-2">
            <Link key={`${link.href}-link`} href={link.href} className="flex flex-row items-center gap-1 hover:underline cursor-pointer">
              {link.label}
            </Link>
          </div>
        ))}
      </div>
      <div id="actions" className='flex flex-row items-center gap-2'>
        <CarritoCompra />
        <UserData />
      </div>
    </div>
  )
};

export default Navbar;
