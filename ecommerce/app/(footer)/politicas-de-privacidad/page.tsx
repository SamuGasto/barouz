import { Metadata } from 'next';
import { Shield, Lock, User, CreditCard, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad - Barouz',
  description: 'Conoce cómo protegemos y manejamos tu información personal en Barouz.',
};

const privacyPolicies = [
  {
    id: 'informacion-recolectada',
    title: 'Información que Recolectamos',
    icon: <Shield className="h-5 w-5" />,
    content: 'Recolectamos información que nos proporcionas directamente cuando realizas una compra, te registras en nuestro sitio, te suscribes a nuestro boletín o te comunicas con nosotros. Esta información puede incluir:',
    items: [
      'Datos personales (nombre, dirección de correo electrónico, número de teléfono)', 
      'Información de pago (datos de tarjeta de crédito procesados de forma segura a través de nuestro procesador de pagos)', 
      'Dirección de envío y facturación',
      'Historial de compras y preferencias'
    ]
  },
  {
    id: 'uso-informacion',
    title: 'Uso de la Información',
    icon: <User className="h-5 w-5" />,
    content: 'Utilizamos la información que recopilamos para:',
    items: [
      'Procesar tus transacciones y enviar información relacionada',
      'Responder a tus consultas y solicitudes de servicio al cliente',
      'Enviar actualizaciones sobre tu pedido y promociones (solo si has dado tu consentimiento)', 
      'Mejorar nuestros productos, servicios y experiencia del usuario',
      'Cumplir con nuestras obligaciones legales'
    ]
  },
  {
    id: 'proteccion-datos',
    title: 'Protección de Datos',
    icon: <Lock className="h-5 w-5" />,
    content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal:',
    items: [
      'Cifrado de datos en tránsito usando SSL/TLS',
      'Almacenamiento seguro de información sensible',
      'Acceso restringido a datos personales solo para personal autorizado',
      'Revisión periódica de nuestras prácticas de seguridad'
    ]
  },
  {
    id: 'cookies',
    title: 'Uso de Cookies',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cookie">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
      <path d="M8.5 8.5v.01"></path>
      <path d="M16 15.5v.01"></path>
      <path d="M12 12v.01"></path>
      <path d="M11 17v.01"></path>
      <path d="M7 14v.01"></path>
    </svg>,
    content: 'Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia de navegación:',
    items: [
      'Cookies esenciales para el funcionamiento del sitio',
      'Cookies de rendimiento para analizar el uso del sitio',
      'Cookies de funcionalidad para recordar tus preferencias',
      'Puedes gestionar tus preferencias de cookies en cualquier momento'
    ]
  },
  {
    id: 'tus-derechos',
    title: 'Tus Derechos',
    icon: <Check className="h-5 w-5" />,
    content: 'Tienes derecho a:',
    items: [
      'Solicitar acceso a tus datos personales',
      'Solicitar la corrección de datos inexactos',
      'Solicitar la eliminación de tus datos personales',
      'Oponerte al procesamiento de tus datos',
      'Solicitar la limitación del tratamiento de tus datos',
      'Solicitar la portabilidad de tus datos'
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 dark:opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <Shield className="h-8 w-8 text-primary dark:text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Políticas de Privacidad</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cómo protegemos y manejamos tu información personal en Barouz.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-0 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {privacyPolicies.map((policy) => (
              <a
                key={policy.id}
                href={`#${policy.id}`}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full bg-muted hover:bg-muted/80 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors"
              >
                {policy.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground mb-8">
            Última actualización: {new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="space-y-12 text-left">
            {privacyPolicies.map((policy) => (
              <section key={policy.id} id={policy.id} className="scroll-mt-24 bg-card/50 dark:bg-gray-900/30 p-6 rounded-xl border border-gray-100 dark:border-gray-800 mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground mt-0.5 flex-shrink-0">
                    {policy.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{policy.title}</h2>
                    <div className="mt-2">
                      <p className="text-foreground/90 mb-4">{policy.content}</p>
                      {policy.items && (
                        <ul className="space-y-3 mt-4">
                          {policy.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-8 rounded-2xl border border-primary/20 dark:border-primary/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">¿Tienes preguntas sobre privacidad?</h3>
                  <p className="text-foreground/90">
                    Si tienes alguna pregunta sobre nuestras políticas de privacidad o el manejo de tus datos personales, no dudes en contactar a nuestro Oficial de Protección de Datos (DPO).
                  </p>
                </div>
              </div>
              <Button asChild variant="default" className="whitespace-nowrap">
                <Link href="/contacto">
                  <Mail className="mr-2 h-4 w-4" />
                  Contactar al DPO
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
