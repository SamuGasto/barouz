import { z } from "zod";

export type ShippingType = 'delivery' | 'pickup';
export type PaymentMethod = 'transfer' | 'cash' | 'card';

export interface CheckoutFormData {
  shippingType: ShippingType;
  address?: string;
  paymentMethod: PaymentMethod;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
}

export const CheckoutSchema = z.object({
  shippingType: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  paymentMethod: z.enum(['transfer', 'cash', 'card']),
  contactInfo: z.object({
    name: z.string().min(2, 'El nombre es requerido'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(8, 'El teléfono es requerido'),
  }),
  notes: z.string().optional(),
});

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';
