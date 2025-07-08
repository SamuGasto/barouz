import { Metadata } from 'next';
import { Award, Users, Heart, Leaf, Shield, Handshake, Scale, Clock, BarChart2, Lightbulb, Mail, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Código Ético - Barouz',
  description: 'Conoce los principios y valores que rigen nuestro comportamiento en Barouz.',
};

const ethicalPrinciples = [
  {
    id: 'calidad',
    title: 'Compromiso con la Calidad',
    icon: <Award className="h-5 w-5" />,
    description: 'Excelencia en cada detalle de nuestros productos',
    content: 'Nos esforzamos por ofrecer productos de la más alta calidad, utilizando ingredientes frescos y procesos que garanticen la excelencia en cada uno de nuestros postres.',
    items: [
      'Selección rigurosa de ingredientes naturales y de origen responsable',
      'Procesos de producción que priorizan la frescura y el sabor',
      'Estrictos controles de calidad en todas las etapas',
      'Innovación constante para superar las expectativas de nuestros clientes'
    ]
  },
  {
    id: 'respeto',
    title: 'Respeto por las Personas',
    icon: <Users className="h-5 w-5" />,
    description: 'Dignidad y equidad en todas nuestras relaciones',
    content: 'Valoramos y respetamos a todas las personas con las que interactuamos, creando un ambiente de trabajo positivo e inclusivo.',
    items: [
      'Trato digno, respetuoso y equitativo para todos',
      'Ambiente laboral libre de discriminación y acoso',
      'Promoción activa de la diversidad e inclusión',
      'Respeto por la privacidad y confidencialidad de la información personal'
    ]
  },
  {
    id: 'responsabilidad',
    title: 'Responsabilidad Social',
    icon: <Heart className="h-5 w-5" />,
    description: 'Agentes de cambio positivo en la comunidad',
    content: 'Nos comprometemos a generar un impacto social positivo a través de nuestras acciones y decisiones comerciales.',
    items: [
      'Apoyo a iniciativas locales de bienestar comunitario',
      'Generación de empleo local de calidad',
      'Prácticas comerciales justas con proveedores locales',
      'Participación en programas de responsabilidad social'
    ]
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad Ambiental',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Cuidado del medio ambiente en cada paso',
    content: 'Implementamos prácticas sostenibles en toda nuestra cadena de valor para minimizar nuestro impacto ambiental.',
    items: [
      'Uso de ingredientes de origen sostenible',
      'Reducción de residuos y promoción del reciclaje',
      'Eficiencia energética en nuestros procesos',
      'Envases ecológicos y biodegradables'
    ]
  },
  {
    id: 'etica',
    title: 'Ética en los Negocios',
    icon: <Shield className="h-5 w-5" />,
    description: 'Integridad y transparencia en todo momento',
    content: 'Mantenemos los más altos estándares éticos en todas nuestras operaciones y relaciones comerciales.',
    items: [
      'Cumplimiento estricto de leyes y regulaciones',
      'Transparencia en la información al consumidor',
      'Rechazo a prácticas comerciales desleales',
      'Manejo responsable de información confidencial'
    ]
  },
  {
    id: 'proveedores',
    title: 'Relación con Proveedores',
    icon: <Handshake className="h-5 w-5" />,
    description: 'Asociaciones basadas en la confianza mutua',
    content: 'Fomentamos relaciones a largo plazo con proveedores que compartan nuestros valores y compromiso con la calidad.',
    items: [
      'Selección de proveedores con prácticas éticas',
      'Pago justo y oportuno por bienes y servicios',
      'Colaboración para la mejora continua',
      'Respeto por los derechos laborales en la cadena de suministro'
    ]
  }
];

const ethicalCommitments = [
  {
    icon: <Scale className="h-6 w-6 text-primary" />,
    title: 'Cumplimiento Legal',
    description: 'Adherencia estricta a todas las leyes y regulaciones aplicables en nuestras operaciones.'
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Mejora Continua',
    description: 'Compromiso con la innovación y el mejoramiento constante de nuestros procesos y productos.'
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: 'Transparencia',
    description: 'Comunicación clara y honesta con todas nuestras partes interesadas.'
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: 'Innovación Responsable',
    description: 'Desarrollo de productos que combinan creatividad, calidad y responsabilidad.'
  }
];

export default function CodeOfEthicsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 dark:opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 mb-6">
              <Scale className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Código Ético de Barouz</h1>
            <p className="text-xl text-amber-800/90 dark:text-amber-100/80 max-w-3xl mx-auto">
              Nuestro compromiso con la excelencia, integridad y responsabilidad en todo lo que hacemos.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {ethicalPrinciples.map((principle) => (
              <a
                key={principle.id}
                href={`#${principle.id}`}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full bg-amber-50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/70 transition-colors"
              >
                {principle.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Código Ético de Barouz</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestro compromiso con la excelencia, integridad y responsabilidad en todo lo que hacemos.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-muted-foreground text-center">
            En Barouz, creemos que la excelencia en la repostería va más allá del sabor. 
            Nuestro Código Ético refleja los valores fundamentales que guían cada decisión que tomamos, 
            desde la selección de ingredientes hasta la atención al cliente.
          </p>
        </div>

        <div className="space-y-20">
          {ethicalPrinciples.map((principle) => (
            <section key={principle.id} id={principle.id} className="mb-16 scroll-mt-24">
              <div className="flex items-start gap-4 mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{principle.title}</h3>
                  <p className="text-muted-foreground mb-4">{principle.description}</p>
                  <p className="mb-4 text-foreground/90">{principle.content}</p>
                </div>
              </div>
              <div className="pl-11">
                <ul className="space-y-3 mt-4">
                  {principle.items.map((item, index) => (
                    <li key={item} className="flex items-start gap-2 mb-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          {/* Our Commitments */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Nuestros Compromisos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {ethicalCommitments.map((commitment, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                      {commitment.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{commitment.title}</h3>
                      <p className="text-muted-foreground">{commitment.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-16 bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">¿Necesitas más información?</h3>
                  <p className="text-amber-800/90 dark:text-amber-100/80">
                    Si tienes preguntas sobre nuestro código ético o deseas reportar una preocupación, no dudes en contactarnos.
                  </p>
                </div>
              </div>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground mt-12">
            <p>Este Código Ético fue actualizado por última vez el 8 de julio de 2024.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
