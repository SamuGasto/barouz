'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../stores/cart-store';
import { useCheckoutStore } from '../../stores/checkout-store';
import { CheckoutStep } from '../../components/checkout/checkout-step';
import { ShippingStep } from '../../components/checkout/shipping-step';
import { PaymentStep } from '../../components/checkout/payment-step';
import { ReviewStep } from '../../components/checkout/review-step';
import { ConfirmationStep } from '../../components/checkout/confirmation-step';
import { CheckoutProvider } from '../../components/checkout/checkout-context';
import { CheckoutStep as CheckoutStepType } from '../../types/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { currentStep, orderId, reset, setCurrentStep } = useCheckoutStore();



  // Reset checkout state when component unmounts
  useEffect(() => {
    return () => {
      if (currentStep === 'confirmation') {
        reset();
        clearCart();
      }
    };
  }, [currentStep, reset, clearCart]);

  // Ensure we have a valid step
  useEffect(() => {
    const validSteps: CheckoutStepType[] = ['shipping', 'payment', 'review', 'confirmation'];
    if (!validSteps.includes(currentStep as CheckoutStepType)) {
      setCurrentStep('shipping');
    }
  }, [currentStep, setCurrentStep]);

  const handleOrderSubmit = async () => {
    const { success, orderId } = await useCheckoutStore.getState().submitOrder();
    if (success && orderId) {
      useCheckoutStore.getState().setCurrentStep('confirmation');
    }
  };

  return (
    <CheckoutProvider>
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight mb-8">Finalizar compra</h1>

          <div className="mb-8">
            <CheckoutStep />
          </div>

          <div className="mt-8">
            {currentStep === 'shipping' && (
              <ShippingStep onNext={() => setCurrentStep('payment')} />
            )}

            {currentStep === 'payment' && (
              <PaymentStep
                onBack={() => setCurrentStep('shipping')}
                onNext={() => setCurrentStep('review')}
              />
            )}

            {currentStep === 'review' && (
              <ReviewStep
                onBack={() => setCurrentStep('payment')}
                onSubmit={handleOrderSubmit}
                isSubmitting={useCheckoutStore.getState().isSubmitting}
              />
            )}

            {currentStep === 'confirmation' && orderId && (
              <ConfirmationStep orderId={orderId} />
            )}
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}