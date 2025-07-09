import { Metadata } from 'next';
import React from 'react';
import {
  Shield,
  Lock,
  User,
  CreditCard,
  Server,
  Mail,
  Bell,
  FileText,
  HelpCircle,
  CheckCircle,
  BarChart2,
  Share2,
  AlertCircle,
  RefreshCw,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Sliders,
  Download,
  Cookie,
  Settings,
  Backpack,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Barouz',
  description: 'Conoce cómo protegemos y manejamos tu información personal en Barouz.',
};

const privacySections = [
  {
    id: 'informacion',
    title: 'Información que Recopilamos',
    icon: <Server className="h-5 w-5" />,
    content: 'Recopilamos diversos tipos de información para brindarte el mejor servicio posible:',
    items: [
      { icon: <User className="h-4 w-4 text-primary" />, text: 'Información de contacto: Nombre, correo electrónico, teléfono, dirección de envío.' },
      { icon: <CreditCard className="h-4 w-4 text-primary" />, text: 'Datos de pago: Procesados de forma segura mediante pasarelas de pago certificadas.' },
      { icon: <Lock className="h-4 w-4 text-primary" />, text: 'Credenciales de acceso: Nombre de usuario y contraseña cifrados.' },
      { icon: <Shield className="h-4 w-4 text-primary" />, text: 'Datos de navegación: Uso del sitio, preferencias y patrones de interacción.' },
    ]
  },
  {
    id: 'uso',
    title: 'Uso de tu Información',
    icon: <FileText className="h-5 w-5" />,
    content: 'Tu información nos permite ofrecerte un servicio personalizado y seguro:',
    items: [
      { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: 'Procesamiento de pedidos y gestión de tu cuenta.' },
      { icon: <Mail className="h-4 w-4 text-primary" />, text: 'Comunicación sobre tu cuenta, pedidos y actualizaciones importantes.' },
      { icon: <HelpCircle className="h-4 w-4 text-primary" />, text: 'Soporte al cliente personalizado y resolución de consultas.' },
      { icon: <BarChart2 className="h-4 w-4 text-primary" />, text: 'Mejora continua de nuestros productos y servicios.' },
      { icon: <Bell className="h-4 w-4 text-primary" />, text: 'Envío de ofertas exclusivas (si nos das tu consentimiento).' },
    ]
  },
  {
    id: 'compartir',
    title: 'Compartiendo tu Información',
    icon: <Share2 className="h-5 w-5" />,
    content: 'Valoramos tu privacidad y solo compartimos información cuando es necesario:',
    items: [
      { icon: <Shield className="h-4 w-4 text-primary" />, text: 'Proveedores de servicios confiables que cumplen con estrictos acuerdos de confidencialidad.' },
      { icon: <AlertCircle className="h-4 w-4 text-primary" />, text: 'Autoridades competentes cuando lo exija la ley o para proteger nuestros derechos legales.' },
      { icon: <Lock className="h-4 w-4 text-primary" />, text: 'Datos anonimizados para análisis estadísticos y de mercado.' }
    ]
  },
  {
    id: 'seguridad',
    title: 'Seguridad de Datos',
    icon: <Lock className="h-5 w-5" />,
    content: 'Implementamos medidas de seguridad robustas para proteger tu información:',
    items: [
      { icon: <Shield className="h-4 w-4 text-primary" />, text: 'Encriptación de extremo a extremo para todos los datos sensibles.' },
      { icon: <Lock className="h-4 w-4 text-primary" />, text: 'Acceso restringido solo a personal autorizado.' },
      { icon: <RefreshCw className="h-4 w-4 text-primary" />, text: 'Actualizaciones periódicas de nuestros sistemas de seguridad.' },
      { icon: <AlertCircle className="h-4 w-4 text-primary" />, text: 'Protocolos de respuesta ante incidentes de seguridad.' }
    ]
  },
  {
    id: 'derechos',
    title: 'Tus Derechos',
    icon: <UserCheck className="h-5 w-5" />,
    content: 'Tienes derecho a:',
    items: [
      { icon: <Eye className="h-4 w-4 text-primary" />, text: 'Solicitar acceso a tus datos personales.' },
      { icon: <Edit className="h-4 w-4 text-primary" />, text: 'Rectificar información inexacta.' },
      { icon: <Trash2 className="h-4 w-4 text-primary" />, text: 'Solicitar la eliminación de tus datos.' },
      { icon: <Sliders className="h-4 w-4 text-primary" />, text: 'Oponerte al procesamiento de tus datos.' },
      { icon: <Download className="h-4 w-4 text-primary" />, text: 'Recibir una copia de tus datos en formato estándar.' }
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies y Tecnologías Similares',
    icon: <Cookie className="h-5 w-5" />,
    content: 'Utilizamos cookies para mejorar tu experiencia:',
    items: [
      { icon: <Settings className="h-4 w-4 text-primary" />, text: 'Cookies esenciales para el funcionamiento del sitio.' },
      { icon: <BarChart2 className="h-4 w-4 text-primary" />, text: 'Cookies analíticas para entender el uso del sitio.' },
      { icon: <Bell className="h-4 w-4 text-primary" />, text: 'Cookies de preferencias para recordar tus ajustes.' },
      { icon: <Shield className="h-4 w-4 text-primary" />, text: 'Puedes gestionar tus preferencias de cookies en cualquier momento.' }
    ]
  },
  {
    id: 'menores',
    title: 'Menores de Edad',
    icon: <Backpack className="h-5 w-5" />,
    content: 'Nuestros servicios no están dirigidos a menores de 14 años. Si eres padre/madre o tutor y crees que tu hijo/a nos ha proporcionado información personal, por favor contáctanos.',
    items: []
  },
  {
    id: 'cambios',
    title: 'Cambios en la Política',
    icon: <AlertCircle className="h-5 w-5" />,
    content: 'Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos y publicaremos la versión actualizada en nuestro sitio web con la fecha de la última actualización.',
    items: []
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 dark:opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <Shield className="h-8 w-8 text-primary dark:text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Política de Privacidad</h1>
            <p className="text-xl text-muted-foreground dark:text-foreground/80 max-w-3xl mx-auto">
              En Barouz, tu privacidad es nuestra prioridad. Esta política explica cómo protegemos y manejamos tu información personal.
            </p>
            <p className="mt-4 text-sm text-muted-foreground dark:text-foreground/70">
              Última actualización: {new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center py-4 gap-2 scrollbar-hide">
            {privacySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors"
              >
                {React.cloneElement(section.icon, {
                  className: 'h-4 w-4 text-primary dark:text-primary-foreground'
                })}
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-16">
          <section className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-foreground/90">
              En Barouz, valoramos y respetamos tu privacidad. Esta política explica de manera transparente cómo recopilamos,
              usamos, compartimos y protegemos tu información personal cuando interactúas con nuestros servicios.
            </p>
          </section>

          {privacySections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 bg-card/50 dark:bg-gray-900/30 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground mt-0.5 flex-shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>

              <div className="pl-12">
                <p className="text-foreground/90 mb-4">{section.content}</p>

                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {React.cloneElement(item.icon, {
                          className: 'h-5 w-5 text-primary dark:text-primary-foreground mt-0.5 flex-shrink-0'
                        })}
                        <span className="text-foreground/90">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">¿Tienes preguntas sobre privacidad?</h3>
                  <p className="text-blue-800/90 dark:text-blue-100/80">
                    Si tienes alguna duda sobre cómo manejamos tus datos personales o deseas ejercer tus derechos de privacidad, no dudes en contactarnos.
                  </p>
                </div>
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white">
                <Link href="/contacto" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contáctanos
                </Link>
              </Button>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground mt-12">
            <p>Esta política de privacidad fue actualizada por última vez el 8 de julio de 2024.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
