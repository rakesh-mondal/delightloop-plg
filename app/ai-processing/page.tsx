"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { AIInsightFlow } from "@/components/ai-insight-flow"

export default function AIProcessingPage() {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)

  const handleComplete = () => {
    setIsComplete(true)
  }

  const handleContinue = () => {
    router.push("/gift-selection")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">AI Signal Processing</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is analyzing Alex Johnson's LinkedIn profile to find the perfect gift
            </p>
          </div>

          <AIInsightFlow onComplete={handleComplete} />

          {isComplete && (
            <div className="mt-8 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
              <p className="text-muted-foreground mb-6">
                We've identified the perfect gifts based on Alex Johnson's profile
              </p>
              <Button size="lg" onClick={handleContinue} className="gap-2">
                View Gift Recommendations
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

