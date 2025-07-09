import { z } from "zod/v4";
import { MetodoDePago, TipoEnvio } from "./resumen-tipos";

export interface CheckoutFormData {
  tipoDeEnvio: TipoEnvio;
  direccion?: string;
  metodoPago: MetodoDePago;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
}

export const tipoEnvioArray: TipoEnvio[] = [
  "Delivery",
  "Retiro en tienda",
] as const;
export const metodoPagoArray: MetodoDePago[] = [
  "Transferencia",
  "Efectivo",
] as const;

export const CheckoutSchema = z.object({
  tipoDeEnvio: z.enum(tipoEnvioArray),
  direccion: z.string().optional(),
  metodoPago: z.enum(metodoPagoArray),
});

export type PasosCheckout = "Envío" | "Pago" | "Resumen" | "Confirmación";
