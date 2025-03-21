import { Gift, Package, Truck, CheckCircle } from "lucide-react"

interface TrackingAnimationProps {
  status: "processing" | "preparing" | "shipping" | "delivered"
}

export function TrackingAnimation({ status }: TrackingAnimationProps) {
  const steps = [
    { id: "processing", icon: Gift, label: "Processing" },
    { id: "preparing", icon: Package, label: "Preparing" },
    { id: "shipping", icon: Truck, label: "Shipping" },
    { id: "delivered", icon: CheckCircle, label: "Delivered" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === status)

  return (
    <div className="w-full py-8">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${currentStepIndex >= 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= currentStepIndex
          const isCurrentStep = index === currentStepIndex

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                  ${isCurrentStep ? "gift-animation" : ""}
                `}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium
                  ${isActive ? "text-primary" : "text-muted-foreground"}
                `}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

