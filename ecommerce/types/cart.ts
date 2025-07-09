export interface CartItemExtra {
  id: string;
  nombre: string;
  precio: number;
}

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  extras?: CartItemExtra[];
}

export interface CartState {
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
