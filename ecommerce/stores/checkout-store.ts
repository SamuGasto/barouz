import { create } from 'zustand';
import { CheckoutFormData, CheckoutStep } from '@/types/checkout';

export type { CheckoutStep };

interface CheckoutState {
  currentStep: CheckoutStep;
  formData: Partial<CheckoutFormData>;
  orderId: string | null;
  isSubmitting: boolean;
  error: string | null;
  setCurrentStep: (step: CheckoutStep) => void;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  submitOrder: () => Promise<{ success: boolean; orderId?: string; error?: string }>;
  reset: () => void;
}

// Export the store with proper typing
export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  currentStep: 'shipping',
  formData: {},
  orderId: null,
  isSubmitting: false,
  error: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) => 
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),

  submitOrder: async () => {
    set({ isSubmitting: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to your backend
      const orderId = `order-${Math.random().toString(36).substr(2, 9)}`;
      
      set({ orderId, isSubmitting: false });
      return { success: true, orderId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar el pedido';
      set({ error: errorMessage, isSubmitting: false });
      return { success: false, error: errorMessage };
    }
  },

  reset: () => set({
    currentStep: 'shipping',
    formData: {},
    orderId: null,
    isSubmitting: false,
    error: null,
  }),
}));
