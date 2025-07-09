import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Barouz',
  description: 'Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.',
};

const faqCategories = [
  { id: 'todos', label: 'Todas las categorías' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'envios', label: 'Envíos' },
  { id: 'productos', label: 'Productos' },
  { id: 'eventos', label: 'Eventos' },
];

const faqs = [
  {
    id: 1,
    question: '¿Cuáles son los horarios de atención?',
    answer: 'Nuestros locales atienden de lunes a domingo de 10:00 AM a 10:00 PM. Los horarios pueden variar en días festivos.',
    category: 'pedidos',
    popular: true
  },
  {
    id: 2,
    question: '¿Hacen envíos a domicilio?',
    answer: 'Sí, realizamos envíos a domicilio en toda la ciudad. El costo del envío varía según la ubicación y se calcula al momento de realizar el pedido.',
    category: 'envios',
    popular: true
  },
  {
    id: 3,
    question: '¿Tienen opciones para personas con restricciones alimentarias?',
    answer: 'Sí, ofrecemos opciones sin gluten, sin lactosa y veganas. Por favor, consulta con nuestro personal sobre las opciones disponibles en nuestro menú.',
    category: 'productos'
  },
  {
    id: 4,
    question: '¿Cómo puedo realizar un pedido especial para un evento?',
    answer: 'Puedes contactarnos a través de nuestro formulario de contacto o llamando a nuestro número de atención al cliente con al menos 48 horas de anticipación para pedidos especiales. Ofrecemos paquetes personalizados para eventos.',
    category: 'eventos',
    popular: true
  },
  {
    id: 5,
    question: '¿Aceptan tarjetas de crédito/débito?',
    answer: 'Sí, aceptamos todas las tarjetas de crédito y débito, además de pagos en efectivo, transferencias bancarias y pagos móviles. Todas las transacciones son seguras y protegidas.',
    category: 'pagos'
  },
  {
    id: 6,
    question: '¿Puedo hacer cambios en mi pedido después de realizarlo?',
    answer: 'Los cambios en los pedidos solo son posibles si el pedido aún no ha entrado en preparación. Por favor, contáctanos de inmediato al +56 9 1234 5678 si necesitas realizar algún cambio o modificación.',
    category: 'pedidos'
  },
  {
    id: 7,
    question: '¿Ofrecen descuentos para grupos grandes?',
    answer: 'Sí, ofrecemos descuentos especiales para pedidos de más de 10 personas. Contáctanos para más información sobre nuestros paquetes para eventos corporativos, cumpleaños y celebraciones especiales.',
    category: 'eventos'
  },
  {
    id: 8,
    question: '¿Cuál es la política de devoluciones?',
    answer: 'Si no estás satisfecho con tu pedido, por favor contáctanos dentro de las 2 horas posteriores a la entrega. Haremos todo lo posible para solucionar cualquier inconveniente con tu pedido.',
    category: 'pedidos'
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Hero Section */}
      <div className="bg-brand-primary text-brand-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">¿Cómo podemos ayudarte?</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Preguntas Frecuentes</h1>
          <p className="text-xl text-brand-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos y servicios.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar preguntas..."
              className="pl-12 py-6 text-base "
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Categorías</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqCategories.map((category) => (
                  <Link key={category.id} href={`/preguntas-frecuentes#${category.id}`}>
                    <Button variant="ghost" className="w-full justify-start font-normal">
                      {category.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* FAQ List */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Preguntas Populares</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {faqs
                  .filter(faq => faq.popular)
                  .map((faq) => (
                    <Card key={faq.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl font-bold mb-6">Todas las Preguntas</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between p-6">
                          <h3 className="font-medium">{faq.question}</h3>
                          <svg
                            className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <CardContent className="p-6 pt-0">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </details>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-brand-primary to-brand-primary/90 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta o inquietud que puedas tener.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Chatear con Soporte
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent text-white border-white/30 hover:bg-white/10">
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent text-white border-white/30 hover:bg-white/10">
                <Mail className="h-5 w-5" />
                Enviar Correo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
