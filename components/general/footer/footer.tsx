import Image from "next/image";
import React from "react";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-4 pt-8 pb-4 bg-[#DAF5F7]">
      <section className="pb-4">
        <div className="flex flex-row items-start gap-10">
          <div className="flex flex-col items-center gap-2">
            <Image
              className="rounded-full"
              src={logo}
              alt="Logo"
              width={32}
              height={32}
            />
            <Image src={logo_texto} alt="Logo" width={128} height={32} />
          </div>
          <div className="flex flex-col items-left gap-2 text-left">
            <h1 className="text-lg font-bold">Barouz</h1>
            <a href="/acerca-de-nosotros">Acerca de Nosotros</a>
            <a href="/ingredientes">Ingredientes</a>
            <a href="/locales">Locales</a>
          </div>
          <div className="flex flex-col items-left gap-2 text-left">
            <h1 className="text-lg font-bold">Ayuda</h1>
            <a href="/preguntas-frecuentes">Preguntas Frecuentes</a>
            <a href="/contacto">Contacto</a>
            <p>Pide por whatsapp: +569 1234 5678</p>
          </div>
          <div className="flex flex-col items-left gap-2 text-left">
            <h1 className="text-lg font-bold">Legal</h1>
            <a href="/terminos-y-condiciones">Terminos y Condiciones</a>
            <a href="/politica-de-privacidad">Politica de Privacidad</a>
            <a href="/codigo-etico">Codigo Etico</a>
          </div>
          <div className="flex flex-col items-left gap-2 text-left">
            <h1 className="text-lg font-bold">Menu</h1>
            <a href="/ofertas">Ofertas</a>
            <a href="/waffles">Waffles</a>
            <a href="/helados">Helados</a>
            <a href="/churros">Churros</a>
            <a href="/postres">Postres</a>
            <a href="/bebidas">Bebidas</a>
          </div>
        </div>
      </section>
      <Separator />
      <section>
        <p>
          © {new Date().getFullYear()} Barouz. Todos los derechos reservados.
        </p>
      </section>
    </footer>
  );
}

export default Footer;
