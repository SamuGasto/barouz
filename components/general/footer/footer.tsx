import Image from "next/image";
import React from "react";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="border-t-brand-primary bg-brand-primary-background mx-auto flex w-full flex-col items-center justify-center gap-4 border-t pt-8 pb-4 text-center text-xs">
      <section className="flex w-full items-center justify-center px-10 pb-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-2">
            <Image className="rounded-full" src={logo} alt="Logo" width={32} />
            <Image src={logo_texto} alt="Logo" width={128} height={32} />
          </div>
          <div className="text-brand-primary grid grid-cols-2 items-start gap-6 text-left md:grid-cols-4">
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Barouz</h1>
              <a href="/acerca-de-nosotros">Acerca de Nosotros</a>
              <a href="/ingredientes">Ingredientes</a>
              <a href="/locales">Locales</a>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Ayuda</h1>
              <a href="/preguntas-frecuentes">Preguntas Frecuentes</a>
              <a href="/contacto">Contacto</a>
              <p>
                Pide por whatsapp: <br />
                +569 1234 5678
              </p>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Legal</h1>
              <a href="/terminos-y-condiciones">Terminos y Condiciones</a>
              <a href="/politica-de-privacidad">Politica de Privacidad</a>
              <a href="/codigo-etico">Codigo Etico</a>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Menu</h1>
              <a href="/ofertas">Ofertas</a>
              <a href="/waffles">Waffles</a>
              <a href="/helados">Helados</a>
              <a href="/churros">Churros</a>
              <a href="/postres">Postres</a>
              <a href="/bebidas">Bebidas</a>
            </div>
          </div>
        </div>
      </section>
      <Separator className="bg-brand-primary" />
      <section>
        <p className="text-brand-primary">
          © {new Date().getFullYear()} Barouz. Todos los derechos reservados.
        </p>
      </section>
    </footer>
  );
}

export default Footer;
