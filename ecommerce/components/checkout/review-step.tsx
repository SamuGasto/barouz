import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useCheckoutStore } from "../../stores/checkout-store";
import { useCartStore } from "../../stores/cart-store";
import { formatPrice } from "../../lib/utils";
import { CheckCircle } from "lucide-react";
import { ShippingType, CheckoutFormData } from "../../types/checkout";

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
  const { items, total, subtotal, shippingCost } = useCartStore();
  
  // Ensure items is an array to prevent errors and type it as CartItem[]
  const cartItems: CartItem[] = Array.isArray(items) ? items : [];

  const getShippingMethod = (): string => {
    const shippingType = (formData as CheckoutFormData)?.shippingType as ShippingType;
    const address = (formData as CheckoutFormData)?.address;
    if (shippingType === 'delivery') {
      return `Envío a domicilio${address ? ` (${address})` : ''}`;
    }
    return 'Recojo en tienda';
  };

  const getPaymentMethod = (): string => {
    const paymentMethod = (formData as CheckoutFormData)?.paymentMethod || '';
    switch (paymentMethod) {
      case 'transfer':
        return 'Transferencia bancaria';
      case 'cash':
        return 'Efectivo';
      case 'card':
        return 'Tarjeta de crédito/débito';
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
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.nombre} × {item.cantidad}
                      </p>
                      {item.extras && item.extras.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {item.extras.map((extra: CartItemExtra) => extra.nombre).join(', ')}
                        </p>
                      )}
                    </div>
                    <p className="font-medium">
                      ${formatPrice(item.precio * item.cantidad)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{shippingCost > 0 ? `$${formatPrice(shippingCost)}` : 'Gratis'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
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
              {formData.contactInfo?.name}<br />
              {formData.contactInfo?.email}<br />
              {formData.contactInfo?.phone}
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
          onClick={onSubmit}
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
