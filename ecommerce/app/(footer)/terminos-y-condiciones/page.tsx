import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Shield, CreditCard, Truck, RefreshCw, Lock, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Barouz',
  description: 'Consulta nuestros términos y condiciones de uso y compra en Barouz.',
};

const terms = [
  {
    id: 'uso-sitio',
    title: 'Uso del Sitio Web',
    icon: <FileText className="h-5 w-5" />,
    content: 'El contenido de este sitio web es únicamente para su uso personal y no comercial. Usted acepta no modificar, copiar, distribuir, transmitir, mostrar, publicar, vender, licenciar o explotar cualquier contenido del sitio con fines comerciales sin nuestro permiso previo por escrito.'
  },
  {
    id: 'compras-pagos',
    title: 'Compras y Pagos',
    icon: <CreditCard className="h-5 w-5" />,
    content: 'Al realizar un pedido a través de nuestro sitio web, usted garantiza que tiene la capacidad legal para celebrar contratos vinculantes. Los precios de nuestros productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o descontinuar productos en cualquier momento sin previo aviso.'
  },
  {
    id: 'politica-entrega',
    title: 'Política de Entrega',
    icon: <Truck className="h-5 w-5" />,
    content: 'Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad del producto. No nos hacemos responsables por retrasos causados por terceros o por circunstancias fuera de nuestro control razonable.'
  },
  {
    id: 'devoluciones',
    title: 'Devoluciones y Reembolsos',
    icon: <RefreshCw className="h-5 w-5" />,
    content: 'Aceptamos devoluciones dentro de los 7 días posteriores a la recepción del producto, siempre y cuando los productos estén en su estado original y con su empaque. Los gastos de envío de devolución corren por cuenta del cliente, a menos que el error sea nuestro.'
  },
  {
    id: 'privacidad',
    title: 'Privacidad y Protección de Datos',
    icon: <Shield className="h-5 w-5" />,
    content: 'Respetamos su privacidad y protegemos sus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar nuestro sitio web, usted acepta el procesamiento de sus datos personales según lo descrito en dicha política.'
  },
  {
    id: 'propiedad-intelectual',
    title: 'Propiedad Intelectual',
    icon: <Lock className="h-5 w-5" />,
    content: 'Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes, videos y software, es propiedad de Barouz y está protegido por las leyes de propiedad intelectual aplicables.'
  }
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 dark:opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <FileText className="h-8 w-8 text-primary dark:text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Términos y Condiciones</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conoce las condiciones que rigen el uso de nuestro sitio web y la adquisición de nuestros productos.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {terms.map((term) => (
              <a
                key={term.id}
                href={`#${term.id}`}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors"
              >
                {term.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Términos y Condiciones</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Última actualización: {new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="space-y-12 text-left">
            {terms.map((term) => (
              <section key={term.id} id={term.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {term.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{term.title}</h2>
                </div>
                <div className="pl-12">
                  <p className="text-foreground/90">{term.content}</p>
                </div>
              </section>
            ))}
          </div>
          
          <div className="mt-16 bg-card p-8 rounded-lg border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">¿Tienes preguntas?</h3>
                  <p className="text-foreground/90">
                    Si necesitas aclaraciones sobre nuestros términos y condiciones, no dudes en contactarnos.
                  </p>
                </div>
              </div>
              <Button asChild className="whitespace-nowrap">
                <Link href="/contacto">Contactar Soporte</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}