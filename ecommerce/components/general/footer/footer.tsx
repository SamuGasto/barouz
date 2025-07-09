import Image from "next/image";
import Link from "next/link";
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
          <Link href="/">
            <div className="flex flex-col items-center gap-2" >
              <Image className="rounded-full shadow-md transition-all duration-200 hover:scale-110" src={logo} alt="Logo Barouz" width={32} />
              <Image className="transition-all duration-200 hover:scale-105" src={logo_texto} alt="Barouz" width={128} />
            </div>
          </Link>
          <div className="text-brand-primary grid grid-cols-2 items-start gap-6 text-left md:grid-cols-4">
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Barouz</h1>
              <Link href="/acerca-de-nosotros" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Acerca de Nosotros">Acerca de Nosotros</Link>
              <Link href="/ingredientes" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Ingredientes">Ingredientes</Link>
              <Link href="/locales" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Locales">Locales</Link>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Ayuda</h1>
              <Link href="/preguntas-frecuentes" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Preguntas Frecuentes">Preguntas Frecuentes</Link>
              <Link href="/contacto" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Contacto">Contacto</Link>
              <p>
                Pide por whatsapp: <br />
                <a href="" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-primary-foreground focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200" aria-label="Pide por WhatsApp">+569 1234 5678</a>
              </p>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Legal</h1>
              <Link href="/terminos-y-condiciones" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Términos y Condiciones">Términos y Condiciones</Link>
              <Link href="/politica-de-privacidad" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Política de Privacidad">Política de Privacidad</Link>
              <Link href="/codigo-etico" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Código Ético">Código Ético</Link>
            </div>
            <div className="items-left flex w-fit flex-col gap-2">
              <h1 className="text-lg font-bold">Menú</h1>
              <Link href="/promociones" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Ofertas" >Ofertas</Link>
              <Link href="/menu#Waffles" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Waffles" >Waffles</Link>
              <Link href="/menu#Helados" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Helados" >Helados</Link>
              <Link href="/menu#Churros" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Churros" >Churros</Link>
              <Link href="/menu#Waffle Cookies" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Waffle Cookies" >Waffle Cookies</Link>
              <Link href="/menu#Postres" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Postres" >Postres</Link>
              <Link href="/menu#Bebidas" className="focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md transition-all duration-200 hover:underline" aria-label="Bebidas" >Bebidas</Link>
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
