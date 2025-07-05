import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useCheckoutStore } from "../../stores/checkout-store";
import { useCarritoStore } from "@/components/providers/carrito-provider";
import { formatPrice } from "../../lib/utils";
import { CheckCircle } from "lucide-react";
import { CheckoutFormData } from "../../types/checkout";
import { useAuth } from "../providers/auth-provider";

// Define the extra type for cart items
interface CartItemExtra {
  id: string;
  nombre: string;
  precio: number;
}

// Define the cart item type
interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  extras?: CartItemExtra[];
}

export function ReviewStep({
  onBack,
  onSubmit,
  isSubmitting,
}: {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const { formData } = useCheckoutStore();
  const user = useAuth();
  const items = useCarritoStore((state) => state.items);

  const subtotal = items.reduce((total, item) => total + item.precio_final * item.cantidad, 0);
  const shippingCost = 5000;
  const total = subtotal + (formData.tipoDeEnvio === 'Delivery' ? shippingCost : 0);

  const getShippingMethod = (): string => {
    const tipoDeEnvio = (formData as CheckoutFormData)?.tipoDeEnvio;
    const direccion = (formData as CheckoutFormData)?.direccion;
    if (tipoDeEnvio === 'Delivery') {
      return `Envío a domicilio${direccion ? ` (${direccion})` : ''}`;
    }
    return 'Retiro en tienda';
  };

  const getPaymentMethod = (): string => {
    const paymentMethod = (formData as CheckoutFormData)?.metodoPago || '';
    switch (paymentMethod) {
      case 'Transferencia':
        return 'Transferencia bancaria';
      case 'Efectivo':
        return 'Efectivo';
      default:
        return 'No especificado';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-3">Productos</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.nombre} × {item.cantidad}
                      </p>
                      {item.extras && item.extras.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {item.extras.map((extra) => extra.nombre).join(', ')}
                        </p>
                      )}
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.precio_final * item.cantidad)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{formData.tipoDeEnvio === 'Delivery' ? `${formatPrice(shippingCost)}` : 'Gratis'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de envío</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Método de envío</h4>
            <p className="text-muted-foreground">{getShippingMethod()}</p>
          </div>
          <div>
            <h4 className="font-medium">Método de pago</h4>
            <p className="text-muted-foreground">{getPaymentMethod()}</p>
          </div>
          <div>
            <h4 className="font-medium">Información de contacto</h4>
            <p className="text-muted-foreground">
              {user?.user?.nombre}<br />
              {user?.user?.email}<br />
              {user?.user?.phone}
            </p>
          </div>
          {formData.notes && (
            <div>
              <h4 className="font-medium">Notas adicionales</h4>
              <p className="text-muted-foreground">{formData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Volver
        </Button>
        <Button
          type="button"
          onClick={() => onSubmit()}
          disabled={isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? (
            'Procesando...'
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Confirmar pedido
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
