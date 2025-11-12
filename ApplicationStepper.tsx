import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ApplicationStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ApplicationStepper({ steps, currentStep }: ApplicationStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={stepIdx !== steps.length - 1 ? 'flex-1' : ''}>
            <div className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2
                    ${currentStep > step.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : currentStep === step.id
                      ? 'border-primary bg-background text-primary'
                      : 'border-muted-foreground bg-background text-muted-foreground'
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <p
                    className={`
                      ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}
                    `}
                  >
                    {step.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`
                    ml-4 h-0.5 flex-1
                    ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}