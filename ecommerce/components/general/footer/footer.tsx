import Image from "next/image";
import React from "react";
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";
import { Separator } from "@/components/ui/separator";

// Footer debe permanecer como Server Component para SEO y performance.
function Footer() {
  return (
    <footer
      className="border-t-brand-primary bg-brand-primary-background mx-auto flex w-full flex-col items-center justify-center gap-4 border-t pt-8 pb-4 text-center text-xs transition-all duration-200"
      role="contentinfo"
      aria-label="Pie de página Barouz"
    >
      <section className="flex w-full items-center justify-center px-10 pb-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-2">
            <Image className="rounded-full shadow-md transition-all duration-200 hover:scale-110" src={logo} alt="Logo Barouz" width={32} />
            <Image className="transition-all duration-200 hover:scale-105" src={logo_texto} alt="Barouz" width={128} />
          </div>
          <div className="text-brand-primary grid grid-cols-2 items-start gap-6 text-left md:grid-cols-4">
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Barouz</h1>
              <a href="/acerca-de-nosotros" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Acerca de Nosotros">Acerca de Nosotros</a>
              <a href="/ingredientes" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Ingredientes">Ingredientes</a>
              <a href="/locales" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Locales">Locales</a>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Ayuda</h1>
              <a href="/preguntas-frecuentes" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Preguntas Frecuentes">Preguntas Frecuentes</a>
              <a href="/contacto" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Contacto">Contacto</a>
              <p>
                Pide por whatsapp: <br />
                <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-primary-foreground focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Pide por WhatsApp">+569 1234 5678</a>
              </p>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Legal</h1>
              <a href="/terminos-y-condiciones" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Términos y Condiciones">Términos y Condiciones</a>
              <a href="/politica-de-privacidad" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Política de Privacidad">Política de Privacidad</a>
              <a href="/codigo-etico" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Código Ético">Código Ético</a>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Menú</h1>
              <a href="/ofertas" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Ofertas">Ofertas</a>
              <a href="/waffles" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Waffles">Waffles</a>
              <a href="/helados" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Helados">Helados</a>
              <a href="/churros" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Churros">Churros</a>
              <a href="/postres" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Postres">Postres</a>
              <a href="/bebidas" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Bebidas">Bebidas</a>
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
