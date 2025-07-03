import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState() {
  return (
    <div className="container flex h-[60vh] flex-col items-center justify-center text-center">
      <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
      <h2 className="mb-2 text-2xl font-bold">Error al cargar los pedidos</h2>
      <p className="text-muted-foreground">
        Ocurrió un error al intentar cargar tu historial de pedidos. Por favor, inténtalo de nuevo más tarde.
      </p>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Reintentar
      </Button>
    </div>
  );
}
