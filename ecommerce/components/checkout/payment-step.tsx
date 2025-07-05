import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckoutFormData } from "../../types/checkout";
import { useCheckoutStore } from "../../stores/checkout-store";
import { Card } from "../../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Check, CreditCard, Banknote, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type MetodoDePago = 'Efectivo' | 'Transferencia';
const metodoPagoArray = ['Efectivo', 'Transferencia'] as const;

interface PaymentStepProps {
  onBack: () => void;
  onNext: () => void;
}

type PaymentFormData = Pick<CheckoutFormData, 'metodoPago'>;

const paymentMethods = [
  {
    id: 'Efectivo',
    label: 'Efectivo',
    description: 'Paga en efectivo al momento de la entrega',
    details: [
      'Pago al recibir tu pedido',
      'Aceptamos solo el monto exacto',
      'Entrega más rápida al confirmar el pago'
    ],
    icon: <Banknote className="h-5 w-5 text-muted-foreground" />
  },
  {
    id: 'Transferencia',
    label: 'Transferencia Bancaria',
    description: 'Realiza una transferencia a nuestra cuenta bancaria',
    details: [
      'Banco: Banco de Chile',
      'Cuenta Corriente: 1234567890',
      'RUT: 12.345.678-9',
      'Razón Social: Barouz SpA',
      'Envía el comprobante al +56 9 1234 5678',
      'Tu pedido se procesará al confirmar el pago'
    ],
    icon: <CreditCard className="h-5 w-5 text-muted-foreground" />
  }
];

export function PaymentStep({ onNext }: PaymentStepProps) {
  const { formData, updateFormData } = useCheckoutStore();
  const router = useRouter();

  // Create a schema that includes the payment method
  const PaymentSchema = z.object({
    metodoPago: z.enum(metodoPagoArray, {
      required_error: "Por favor selecciona un método de pago"
    })
  });

  type PaymentFormData = z.infer<typeof PaymentSchema>;

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      metodoPago: (formData.metodoPago as MetodoDePago) || 'Efectivo',
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    updateFormData({
      metodoPago: data.metodoPago,
    });
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Método de pago</h3>

          <FormField
            control={form.control}
            name="metodoPago"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => field.onChange(method.id)}
                        className={cn(
                          "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary/50",
                          field.value === method.id
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/20"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full border",
                            field.value === method.id
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30"
                          )}>
                            {field.value === method.id && <Check className="h-4 w-4" />}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {method.icon}
                              <span className="ml-2 font-medium">{method.label}</span>
                            </div>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                              {field.value === method.id && (
                                <div className="text-xs text-muted-foreground/80 space-y-1 mt-2">
                                  {method.details.map((detail, i) => (
                                    <p key={i} className="flex items-start">
                                      <span className="mr-1">•</span>
                                      <span>{detail}</span>
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <Button type="submit">
            Continuar al resumen
          </Button>
        </div>
      </form>
    </Form>)
}
