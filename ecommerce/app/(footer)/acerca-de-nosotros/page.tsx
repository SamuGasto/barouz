import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Coffee, Heart, Leaf, Award, Clock, MapPin, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de Nosotros - Barouz',
  description: 'Conoce más sobre Barouz y nuestra pasión por los postres artesanales.',
};

const features = [
  {
    icon: <Coffee className="h-6 w-6 text-primary" />,
    title: 'Ingredientes Premium',
    description: 'Seleccionamos cuidadosamente cada ingrediente para garantizar la mejor calidad en cada bocado.'
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: 'Hecho con Amor',
    description: 'Cada postre es preparado con dedicación y pasión por nuestro equipo de expertos reposteros.'
  },
  {
    icon: <Leaf className="h-6 w-6 text-primary" />,
    title: 'Sostenibilidad',
    description: 'Nos comprometemos con prácticas sostenibles y responsables con el medio ambiente.'
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: 'Calidad Garantizada',
    description: 'Cumplimos con los más altos estándares de calidad en cada uno de nuestros productos.'
  }
];

const stats = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    value: "8+",
    label: "Años de experiencia"
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    value: "3",
    label: "Sucursales"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "50+",
    label: "Colaboradores"
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    value: "1000+",
    label: "Clientes felices"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-primary/90 to-brand-primary/70 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-brand-primary-foreground">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">Nuestra Historia</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Acerca de Barouz</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Creando momentos dulces y memorables desde 2015 con los ingredientes más frescos y recetas tradicionales con un toque innovador.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://hpvtetboyztyynxjyvla.supabase.co/storage/v1/object/public/empresa//barouz.webp"
                  alt="Barouz"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute -bottom-1 -right-1 bg-background p-4 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Años de experiencia</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Barouz nació en 2015 del sueño de tres apasionados por la repostería que buscaban compartir los auténticos sabores de la repostería artesanal con un toque contemporáneo.
                </p>
                <p>
                  Lo que comenzó como un pequeño local en el corazón de la ciudad, hoy se ha convertido en un referente de la repostería fina, reconocido por nuestra calidad, creatividad y atención al detalle.
                </p>
                <p>
                  Cada día, nuestro equipo trabaja incansablemente para superar las expectativas de nuestros clientes, utilizando solo los mejores ingredientes y técnicas tradicionales combinadas con un toque de innovación.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/menu" className="w-full md:w-auto">
                  <Button size="lg">Ver Nuestro Menú</Button>
                </Link>
                <Link href="/locales" className="w-full md:w-auto">
                  <Button variant="outline" size="lg">Visítanos</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              En Barouz, nos regimos por principios que definen cada aspecto de nuestro trabajo y la experiencia que ofrecemos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Barouz en Números</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Algunos datos que reflejan nuestro compromiso y crecimiento a lo largo de los años.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-primary text-brand-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Listo para probar nuestros postres?</h2>
            <p className="text-xl mb-8 text-brand-primary-foreground/90">
              Visítanos hoy y descubre por qué somos la mejor pastelería de la ciudad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/locales" className="w-full md:w-auto">
                <Button variant="secondary" size="lg">Ver Ubicaciones</Button>
              </Link>
              <Link href="/menu" className="w-full md:w-auto">
                <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10" size="lg">
                  Ver Nuestro Menú
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
