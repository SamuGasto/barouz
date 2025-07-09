import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormData, tipoEnvioArray } from "../../types/checkout";
import { useCheckoutStore } from "../../stores/checkout-store";
import { useRouter } from "next/navigation";
import { z } from "zod/v4";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";
import { TipoEnvio } from "@/types/resumen-tipos";
import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Check, Truck, Store, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShippingStepProps {
  onNext: () => void;
}

const FormSchema = z.object({
  tipoDeEnvio: z.enum(tipoEnvioArray),
  direccion: z.string().optional()
}).refine((data) => {
  if (data.tipoDeEnvio === 'Delivery' && !data.direccion) {
    throw new Error('La dirección es requerida');
  }
  return true;
}, {
  message: 'La dirección es requerida',
  path: ['direccion'],
});


export function ShippingStep({ onNext }: ShippingStepProps) {
  const { formData, updateFormData, setCurrentStep } = useCheckoutStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tipoDeEnvio: formData.tipoDeEnvio || 'Delivery',
      direccion: formData.direccion || '',
    },
  });

  // Keep local state in sync with form
  const tipoDeEnvio = form.watch('tipoDeEnvio') as TipoEnvio;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const checkoutData: Partial<CheckoutFormData> = {
      tipoDeEnvio: data.tipoDeEnvio,
      direccion: tipoDeEnvio === 'Delivery' ? data.direccion : '',
    };
    updateFormData(checkoutData);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Método de envío</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="tipoDeEnvio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <div
                          onClick={() => {
                            field.onChange('Delivery');
                          }}
                          className={cn(
                            "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary/50",
                            field.value === 'Delivery'
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/20"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full border",
                              field.value === 'Delivery'
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            )}>
                              {field.value === 'Delivery' && <Check className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Truck className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Envío a domicilio</span>
                              </div>
                              <span className="mt-1 text-sm text-muted-foreground">
                                Recibe tu pedido en la puerta de tu casa
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            field.onChange('Retiro en tienda');
                          }}
                          className={cn(
                            "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary/50",
                            field.value === 'Retiro en tienda'
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/20"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full border",
                              field.value === 'Retiro en tienda'
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            )}>
                              {field.value === 'Retiro en tienda' && <Check className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Store className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Retiro en tienda</span>
                              </div>
                              <span className="mt-1 text-sm text-muted-foreground">
                                Retira tu pedido en nuestro local
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {tipoDeEnvio === 'Delivery' && (
            <div className="space-y-4 rounded-lg border bg-card p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Dirección de envío</h4>
              </div>

              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Ingresa tu dirección completa"
                          className="pl-10"
                        />
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div className="mt-3 flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Tiempo estimado de entrega: 30-45 minutos</span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/cart')}
          >
            Volver al carrito
          </Button>
          <Button type="submit">
            Continuar al pago
          </Button>
        </div>
      </form>
    </Form>
  );
}