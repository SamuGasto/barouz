'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCheckoutStore } from '@/stores/checkout-store';

import { PasosCheckout } from '@/types/checkout';

interface CheckoutContextType {
  currentStep: PasosCheckout;
  setCurrentStep: (step: PasosCheckout) => void;
  formData: any;
  updateFormData: (data: any) => void;
  submitOrder: () => Promise<{ success: boolean; orderId?: string }>;
  isSubmitting: boolean;
  error: string | null;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    submitOrder,
    isSubmitting,
    error,
  } = useCheckoutStore();

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        submitOrder,
        isSubmitting,
        error,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
