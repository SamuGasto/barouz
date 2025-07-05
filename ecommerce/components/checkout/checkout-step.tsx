import { useCheckoutStore } from "@/stores/checkout-store";
import { Check, Package, CreditCard, CheckCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 'Envío',
    name: 'Envío',
    icon: <Package className="h-4 w-4" />
  },
  {
    id: 'Pago',
    name: 'Pago',
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    id: 'Resumen',
    name: 'Resumen',
    icon: <CheckCheck className="h-4 w-4" />
  },
];

export function CheckoutStep() {
  const { currentStep } = useCheckoutStore();
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  // Calculate progress percentage based on current step (0-100)
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="relative py-8">
        {/* Progress bar */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2">
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center relative z-10 translate-y-3">
                {/* Step indicator */}
                <div className={cn(
                  "flex h-10 w-10  items-center justify-center rounded-full border-2 transition-all duration-300 relative z-10",
                  isCompleted && "bg-brand-state-4 border-brand-state-4",
                  isCurrent && "border-brand-state-2 bg-brand-state-2 scale-130 shadow-md",
                  isUpcoming && "border-muted-foreground/30 bg-background"
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <span className={cn(
                      "flex items-center justify-center transition-colors",
                      isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {step.icon}
                    </span>
                  )}
                </div>

                {/* Step label */}
                <span className={cn(
                  "mt-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isCompleted && "text-brand-state-4",
                  isCurrent && "text-brand-state-2",
                  isUpcoming && "text-muted-foreground"
                )}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
