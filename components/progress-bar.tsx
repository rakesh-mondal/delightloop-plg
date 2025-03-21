interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Choose Recipient</span>
        <span className="text-center">Select Gift</span>
        <span className="text-right">Send Gift</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  )
}

