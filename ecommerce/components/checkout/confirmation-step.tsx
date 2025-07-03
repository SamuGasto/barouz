import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function ConfirmationStep({ orderId }: { orderId: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h1 className="text-2xl font-bold tracking-tight mb-2">¡Pedido confirmado!</h1>
      <p className="text-muted-foreground mb-8">
        Tu pedido ha sido procesado correctamente.
        <br />
        Número de pedido: <span className="font-medium">{orderId}</span>
      </p>

      <div className="space-y-4 max-w-md mx-auto">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">¿Qué sigue?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-muted p-2 rounded-full">
                <MailOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Revisa tu correo</h3>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado los detalles de tu pedido a tu correo electrónico.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-muted p-2 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Tiempo de preparación</h3>
                <p className="text-sm text-muted-foreground">
                  Tu pedido estará listo en aproximadamente 30-45 minutos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/">
              Seguir comprando
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/mis-pedidos">
              Ver mis pedidos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MailOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.3" />
      <path d="m19 2-8.2 8.2" />
      <path d="M22 2 12 12" />
    </svg>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
