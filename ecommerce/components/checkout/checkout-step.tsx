import { useCheckoutStore } from "../../stores/checkout-store";
import { Check } from "lucide-react";

const steps = [
  { id: 'shipping', name: 'Envío' },
  { id: 'payment', name: 'Pago' },
  { id: 'review', name: 'Revisión' },
];

export function CheckoutStep() {
  const { currentStep } = useCheckoutStore();
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <nav aria-label="Checkout steps" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isCompleted = stepIdx < currentStepIndex;
          const isCurrent = stepIdx === currentStepIndex;
          const status = isCurrent 
            ? 'current' 
            : isCompleted 
              ? 'complete' 
              : 'upcoming';

          return (
            <li 
              key={step.id}
              className={`flex items-center ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 
                    ${status === 'complete' 
                      ? 'bg-primary border-primary' 
                      : status === 'current' 
                        ? 'border-primary' 
                        : 'border-muted-foreground/30'}`}
                >
                  {status === 'complete' ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className={`text-sm font-medium ${status === 'current' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {stepIdx + 1}
                    </span>
                  )}
                </div>
                <span 
                  className={`mt-2 text-sm font-medium ${
                    status === 'complete' || status === 'current' 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className={`h-0.5 flex-1 ${stepIdx < currentStepIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
