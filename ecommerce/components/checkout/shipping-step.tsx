import { Button } from "../../components/ui/button";
// Import the RadioGroup components directly from the Radix UI package
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

// Create a local RadioGroup component with proper typing
const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupItem = RadioGroupPrimitive.Item;
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormData, ShippingType, CheckoutSchema } from "../../types/checkout";
import { useCheckoutStore } from "../../stores/checkout-store";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface ShippingStepProps {
  onNext: () => void;
}

export function ShippingStep({ onNext }: ShippingStepProps) {
  const { formData, updateFormData, setCurrentStep } = useCheckoutStore();
  const router = useRouter();

  // Create a schema that matches our form fields
  const ShippingSchema = z.object({
    shippingType: z.enum(["delivery", "pickup"]),
    address: z.string().min(1, { message: "La dirección es requerida" }).optional()
  });

  type ShippingFormData = z.infer<typeof ShippingSchema>;

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      shippingType: 'delivery',
      address: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, watch } = form;

  const shippingType = watch('shippingType');

  const onSubmit = (data: ShippingFormData) => {
    updateFormData({
      shippingType: data.shippingType,
      address: data.shippingType === 'delivery' ? data.address : '',
    } as CheckoutFormData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        <RadioGroup
          defaultValue="delivery"
          className="space-y-4"
          onValueChange={(value: string) => form.setValue('shippingType', value as ShippingType)}
          value={shippingType}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="text-base font-medium">
              Envío a domicilio
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="text-base font-medium">
              Recojo en tienda
            </Label>
          </div>
        </RadioGroup>

        {shippingType === 'delivery' && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Dirección de envío
            </Label>
            <div className="relative">
              <input 
                id="address" 
                placeholder="Ingresa tu dirección" 
                {...register('address')}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address?.message}
                </p>
              )}
            </div>
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
  );
}

// Simple icons for the shipping options
function Truck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M19 18h-4c0-1.7 1.3-3 3-3h1c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1Z" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h6" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
