import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckoutFormData, PaymentMethod } from "../../types/checkout";
import { useCheckoutStore } from "../../stores/checkout-store";
import { Card } from "../../components/ui/card";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

// Create local RadioGroup components with proper typing
const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupItem = RadioGroupPrimitive.Item;

interface PaymentStepProps {
  onBack: () => void;
  onNext: () => void;
}

export function PaymentStep({ onBack, onNext }: PaymentStepProps) {
  const { formData, updateFormData } = useCheckoutStore();

  // Create a schema that only includes the payment method
  const PaymentSchema = z.object({
    paymentMethod: z.enum(["transfer", "cash", "card"] as const, {
      required_error: "Por favor selecciona un método de pago",
    }),
  });

  type PaymentFormData = z.infer<typeof PaymentSchema>;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod: formData.paymentMethod || 'transfer',
    },
    resolver: zodResolver(PaymentSchema),
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = (data: PaymentFormData) => {
    updateFormData({
      ...formData,
      paymentMethod: data.paymentMethod,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Método de pago</h3>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(value: string) => setValue('paymentMethod', value as PaymentMethod)}
          className="grid gap-4"
        >
          <Card className="border-2 border-transparent hover:border-primary transition-colors">
            <Label className="block w-full cursor-pointer p-4">
              <div className="flex items-start space-x-4">
                <RadioGroupItem value="transfer" id="transfer" className="mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium">Transferencia bancaria</h4>
                  <p className="text-sm text-muted-foreground">
                    Realiza el pago directamente a nuestra cuenta bancaria
                  </p>
                  {paymentMethod === 'transfer' && (
                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                      <p>Banco: Banco de Chile</p>
                      <p>Cuenta Corriente: 1234567890</p>
                      <p>RUT: 76.543.210-1</p>
                      <p>Razón Social: Mi Tienda SpA</p>
                    </div>
                  )}
                </div>
              </div>
            </Label>
          </Card>

          <Card className="border-2 border-transparent hover:border-primary transition-colors mt-4">
            <Label className="block w-full cursor-pointer p-4">
              <div className="flex items-start space-x-4">
                <RadioGroupItem value="cash" id="cash" className="mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium">Efectivo al recibir</h4>
                  <p className="text-sm text-muted-foreground">
                    Paga en efectivo cuando recibas tu pedido
                  </p>
                  {paymentMethod === 'cash' && (
                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                      <p>• Ten el monto exacto disponible al momento de la entrega.</p>
                      <p>• El repartidor no podrá dar vuelto.</p>
                    </div>
                  )}
                </div>
              </div>
            </Label>
          </Card>
        </RadioGroup>

        {errors.paymentMethod && (
          <p className="text-sm text-destructive mt-2">
            {errors.paymentMethod.message}
          </p>
        )}

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Volver
          </Button>
          <Button type="submit">
            Continuar a revisión
          </Button>
        </div>
      </div>
    </form>)
}

// Icons for payment methods
const PaymentIcons = {
  transfer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  cash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  ),
  card: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-muted-foreground"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
};
