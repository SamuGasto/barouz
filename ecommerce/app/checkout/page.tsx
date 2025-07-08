'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCarritoStore } from '@/components/providers/carrito-provider';
import { useCheckoutStore } from '../../stores/checkout-store';
import { CheckoutStep } from '../../components/checkout/checkout-step';
import { ShippingStep } from '../../components/checkout/shipping-step';
import { PaymentStep } from '../../components/checkout/payment-step';
import { ReviewStep } from '../../components/checkout/review-step';
import { ConfirmationStep } from '../../components/checkout/confirmation-step';
import { CheckoutProvider } from '../../components/checkout/checkout-context';
import { PasosCheckout } from '@/types/checkout';
import { useGestionarPedidoFinal } from '@/hooks/usePedidos';
import { CrearNuevoPedidoCompletoArgs } from '@/services/pedidos';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuth();
  const items = useCarritoStore((state) => state.items);
  const cupon = useCarritoStore((state) => state.cupon);
  const limpiarCarrito = useCarritoStore((state) => state.limpiarCarrito);
  const { currentStep, orderId, reset, formData, setCurrentStep } = useCheckoutStore();
  const { mutate: gestionarPedidoFinal, isPending: isGestionandoPedidoFinal } = useGestionarPedidoFinal();

  // Reset checkout state when component unmounts
  useEffect(() => {
    return () => {
      if (currentStep === 'Confirmación') {
        reset();
        limpiarCarrito();
      }
    };
  }, [currentStep, reset, limpiarCarrito]);

  // Ensure we have a valid step
  useEffect(() => {
    const validSteps: PasosCheckout[] = ['Envío', 'Pago', 'Resumen', 'Confirmación'];
    if (!validSteps.includes(currentStep)) {
      setCurrentStep('Envío');
    }
    if (items.length === 0 && currentStep !== 'Confirmación') {
      setCurrentStep('Envío');
      router.push('/cart');
    }
  }, [currentStep, setCurrentStep, items]);

  const handleOrderSubmit = async () => {
    const { success, orderId } = await useCheckoutStore.getState().submitOrder();
    if (!success) {
      toast.error('El pedido todavía no esta completado, faltan campos');
      return;
    }
    if (!orderId) {
      toast.error('El pedido no tiene un ID');
      return;
    }
    if (!user?.user?.id) {
      toast.error('El usuario no está autenticado');
      return;
    }
    if (!formData.tipoDeEnvio || !formData.metodoPago) {
      toast.error('Faltan datos del pedido');
      return;
    }
    if (!items.length) {
      toast.error('El carrito está vacío');
      return;
    }

    if (success) {
      // Crea el pedido completo
      const pedidoFinal: CrearNuevoPedidoCompletoArgs = {
        usuario_id: user?.user?.id,
        pedido: {
          tipoDeEnvio: formData.tipoDeEnvio,
          metodoPago: formData.metodoPago,
          items,
          direccion: formData.direccion,
          cupon,
        },
      };

      gestionarPedidoFinal(pedidoFinal, {
        onSuccess: (data) => {
          useCheckoutStore.getState().setCurrentStep('Confirmación');
          useCheckoutStore.getState().setOrderId(data);
          limpiarCarrito();
          toast.success('Pedido creado exitosamente');
        },
        onError: (error) => {
          console.error("Error al gestionar el pedido final:", error);
          toast.error('Error al crear el pedido');
        },
      });
    }
  };

  return (
    <CheckoutProvider>
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight mb-8">Finalizar compra</h1>

          {currentStep !== 'Confirmación' && (
            <div className="mb-8">
              <CheckoutStep />
            </div>
          )}

          <div className="mt-8">
            {currentStep === 'Envío' && (
              <ShippingStep onNext={() => setCurrentStep('Pago')} />
            )}

            {currentStep === 'Pago' && (
              <PaymentStep
                onBack={() => setCurrentStep('Envío')}
                onNext={() => setCurrentStep('Resumen')}
              />
            )}

            {currentStep === 'Resumen' && (
              <ReviewStep
                onBack={() => setCurrentStep('Pago')}
                onSubmit={() => handleOrderSubmit()}
                isSubmitting={isGestionandoPedidoFinal}
              />
            )}

            {currentStep === 'Confirmación' && orderId && (
              <ConfirmationStep orderId={orderId} />
            )}
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}