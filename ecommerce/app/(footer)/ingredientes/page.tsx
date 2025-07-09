import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Heart, Award, Check, Coffee, Sparkles, ArrowRight, Droplet, Wheat, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ingredientes - Barouz',
  description: 'Descubre los ingredientes de la más alta calidad que utilizamos en nuestros postres.',
};

const ingredientCategories = [
  {
    title: 'Ingredientes Premium',
    icon: <Award className="h-5 w-5" />,
    description: 'Seleccionamos solo los ingredientes de la más alta calidad para garantizar la excelencia en cada bocado.'
  },
  {
    title: 'Enfoque Saludable',
    icon: <Heart className="h-5 w-5" />,
    description: 'Priorizamos ingredientes naturales y nutritivos que aporten beneficios a tu bienestar.'
  },
  {
    title: 'Sostenibilidad',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Trabajamos con proveedores locales y prácticas sostenibles para reducir nuestro impacto ambiental.'
  }
];

const ingredients = [
  {
    name: 'Chocolate Belga',
    description: 'Utilizamos auténtico chocolate belga de la más alta calidad para garantizar un sabor excepcional en todos nuestros postres.',
    benefits: ['Rico en antioxidantes', 'Mejora el estado de ánimo', 'Fuente de energía'],
    icon: <Coffee className="h-6 w-6 text-amber-700" />
  },
  {
    name: 'Frutas Frescas',
    description: 'Seleccionamos las frutas más frescas de temporada para asegurar el mejor sabor y textura en cada bocado.',
    benefits: ['Ricas en vitaminas', 'Fuente de fibra', 'Bajas en calorías'],
    icon: <Sparkles className="h-6 w-6 text-red-400" />
  },
  {
    name: 'Leche Fresca',
    description: 'Nuestra leche proviene de granjas locales que garantizan los más altos estándares de calidad y frescura.',
    benefits: ['Alto contenido en calcio', 'Fuente de proteínas', 'Ayuda a la hidratación'],
    icon: <Droplet className="h-6 w-6 text-blue-300" />
  },
  {
    name: 'Harina Orgánica',
    description: 'Utilizamos harina orgánica certificada para todas nuestras preparaciones, libre de pesticidas y químicos.',
    benefits: ['Mejor sabor', 'Más nutrientes', 'Libre de químicos'],
    icon: <Wheat className="h-6 w-6 text-amber-300" />
  },
  {
    name: 'Endulzantes Naturales',
    description: 'Optamos por endulzantes naturales como miel de abeja pura y azúcar de caña sin refinar.',
    benefits: ['Índice glucémico más bajo', 'Sabor más intenso', 'Menos procesados'],
    icon: <Sparkle className="h-6 w-6 text-yellow-400" />
  }
];

export default function IngredientsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-primary/90 to-brand-primary/70 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-brand-background-2 backdrop-blur-sm">
              <Leaf className="mr-2 h-4 w-4" />
              Ingredientes de Calidad
            </Badge>
            <h1 className="text-4xl md:text-5xl text-brand-primary-foreground font-bold mb-6">Nuestros Ingredientes</h1>
            <p className="text-xl text-brand-primary-foreground">
              En Barouz, la excelencia de nuestros postres comienza con la selección de los mejores ingredientes.
              Cada componente es cuidadosamente elegido para ofrecerte una experiencia culinaria única y saludable.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {ingredientCategories.map((category, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Descubre Nuestros Ingredientes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce los ingredientes que hacen de nuestros postres una experiencia única y deliciosa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ingredient, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                    {ingredient.icon}
                  </div>
                  <CardTitle className="text-2xl">{ingredient.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{ingredient.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <Check className="h-4 w-4 mr-2 text-brand-primary" />
                      Beneficios:
                    </h4>
                    <ul className="space-y-2">
                      {ingredient.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-background p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">¿Tienes alguna alergia o restricción alimentaria?</h2>
            <p className="text-muted-foreground mb-8">
              Nuestro equipo está para ayudarte. Contáctanos para más información sobre alérgenos e ingredientes.
            </p>
            <Link href="/contacto" className="w-full md:w-auto">
              <Button size="lg" className="group">
                Contáctanos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
