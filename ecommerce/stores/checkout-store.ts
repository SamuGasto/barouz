import { create } from "zustand";
import { CheckoutFormData, PasosCheckout } from "@/types/checkout";

interface CheckoutState {
  currentStep: PasosCheckout;
  formData: Partial<CheckoutFormData>;
  orderId: string | null;
  isSubmitting: boolean;
  error: string | null;
  setCurrentStep: (step: PasosCheckout) => void;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  submitOrder: () => Promise<{
    success: boolean;
    orderId?: string;
    error?: string;
  }>;
  setOrderId: (orderId: string) => void;
  reset: () => void;
}

// Export the store with proper typing
export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  currentStep: "Envío",
  formData: {},
  orderId: null,
  isSubmitting: false,
  error: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  submitOrder: async () => {
    set({ isSubmitting: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would be an API call to your backend
      const orderId = `order-${Math.random().toString(36).substr(2, 9)}`;

      set((state) => ({ ...state, orderId, isSubmitting: false }));
      return { success: true, orderId };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al procesar el pedido";
      set((state) => ({ ...state, error: errorMessage, isSubmitting: false }));
      return { success: false, error: errorMessage };
    }
  },

  setOrderId: (orderId: string) => set((state) => ({ ...state, orderId })),

  reset: () =>
    set({
      currentStep: "Envío",
      formData: {},
      orderId: null,
      isSubmitting: false,
      error: null,
    }),
}));
