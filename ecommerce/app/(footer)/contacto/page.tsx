import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, Phone, Clock, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Contacto - Barouz',
  description: 'Contáctanos para consultas, sugerencias o pedidos especiales. Estamos aquí para ayudarte.',
};

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Nuestras Sucursales',
    items: [
      'Av. Principal 1234, Providencia',
      'Mall Plaza Egaña, Local 45',
      'Av. Apoquindo 4501, Las Condes'
    ]
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Teléfonos',
    items: [
      'Reservas: +56 9 1234 5678',
      'Delivery: +56 9 8765 4321',
      'Eventos: +56 9 5678 1234'
    ]
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Correos Electrónicos',
    items: [
      'Reservas: reservas@barouz.cl',
      'Delivery: pedidos@barouz.cl',
      'Eventos: eventos@barouz.cl'
    ]
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Horario de Atención',
    items: [
      'Lun-Jue: 10:00 - 23:00 hrs',
      'Vie-Sáb: 10:00 - 00:00 hrs',
      'Dom: 11:00 - 22:00 hrs'
    ]
  }
];

export default async function ContactPage() {
  async function onSubmit(formData: FormData) {
    "use server"
    console.log(formData)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-primary/90 to-brand-primary/70 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-brand-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h1>
          <p className="text-xl max-w-3xl mx-auto">
            ¿Tienes alguna pregunta, comentario o sugerencia? Nuestro equipo está listo para ayudarte.
          </p>
        </div>
      </div>

      {/* Contact Info Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                    {info.icon}
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {info.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-brand-primary-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <Card className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Contact Form */}
              <div className="p-8 md:p-12">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-3xl font-bold mb-2">Envíanos un mensaje</h2>
                  <p className="text-brand-primary-foreground mb-8">
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                  </p>

                  <form className="space-y-6" action={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nombre completo</label>
                        <Input id="name" placeholder="Tu nombre" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
                        <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                      <Input id="subject" placeholder="¿En qué podemos ayudarte?" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                      <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Enviar mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Map */}
              <div className="relative min-h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 max-w-sm">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Visítanos</h3>
                    <p className="text-brand-primary-foreground mb-6">
                      Te esperamos en cualquiera de nuestras sucursales para ofrecerte la mejor experiencia.
                    </p>
                    <Link href={"/locales"}>
                      <Button variant="outline" className="group">
                        Ver en el mapa
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA Section */}
      <section className="py-16 bg-brand-primary text-brand-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Tienes preguntas frecuentes?</h2>
            <p className="text-xl mb-8 text-brand-primary-foreground/90">
              Visita nuestra sección de preguntas frecuentes para encontrar respuestas rápidas.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="/preguntas-frecuentes">Ver Preguntas Frecuentes</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
