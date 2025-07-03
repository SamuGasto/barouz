import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState } from '@/types/cart';

// Re-export types for convenience
export type { CartItem, CartState } from '@/types/cart';

// Full store state including methods
interface CartStoreState extends CartState {
  items: CartItem[];
  cupon: string | null;
  subtotal: number;
  shippingCost: number;
  total: number;
  addToCart: (item: Omit<CartItem, 'cantidad'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  calculateTotals: () => void;
}

const calculateItemTotal = (item: CartItem): number => {
  const extrasTotal = item.extras?.reduce((sum, extra) => sum + extra.precio, 0) || 0;
  return (item.precio + extrasTotal) * item.cantidad;
};

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      cupon: null,
      subtotal: 0,
      shippingCost: 0,
      total: 0,

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, cantidad: i.cantidad + 1 }
                  : i
              ),
            };
          }
          
          return {
            items: [...state.items, { ...item, cantidad: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, cantidad) =>
        set((state) => {
          if (cantidad <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, cantidad } : item
            ),
          };
        }),

      clearCart: () =>
        set((state) => ({
          ...state,
          items: [],
          cupon: null,
          subtotal: 0,
          shippingCost: 0,
          total: 0,
        })),

      applyCoupon: (code) => {
        // In a real app, validate the coupon with an API call
        const isValid = code === 'DESCUENTO10'; // Example coupon
        if (isValid) {
          set({ cupon: code });
          get().calculateTotals();
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({ cupon: null });
        get().calculateTotals();
      },

      calculateTotals: () =>
        set((state) => {
          const subtotal = state.items.reduce(
            (sum, item) => sum + calculateItemTotal(item),
            0
          );
          
          // Simple shipping calculation (example: $5 per item)
          const shippingCost = state.items.length * 5;
          
          // Apply coupon (10% off for demo)
          const discount = state.cupon ? subtotal * 0.1 : 0;
          
          return {
            subtotal,
            shippingCost,
            total: subtotal + shippingCost - discount,
          };
        }),
    }),
    {
      name: 'cart-storage',
      partialize: (state: CartStoreState) => ({
        items: state.items,
        cupon: state.cupon,
        subtotal: state.subtotal,
        shippingCost: state.shippingCost,
        total: state.total,
      }),
    }
  )
);
