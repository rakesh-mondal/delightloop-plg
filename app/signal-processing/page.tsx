"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIInsightFlowCompact } from "@/components/ai-insight-flow-compact"

export default function SignalProcessingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Get recipient details from URL params
  const name = searchParams.get("name") || "Alex Johnson"
  const title = searchParams.get("title") || "Marketing Director"
  const company = searchParams.get("company") || "TechCorp Inc."
  const image = searchParams.get("image") || "/placeholder.svg?height=100&width=100"
  const companyLogo = searchParams.get("companyLogo") || ""

  const handleComplete = () => {
    setIsComplete(true)
  }

  const handleContinue = () => {
    router.push("/gift-selection")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-indigo-50">
      <main className="flex-1 container max-w-3xl mx-auto py-6 px-4">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold mb-2">Analyzing LinkedIn Profile</h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Our AI is processing signals from {name}'s profile
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">{name}</h2>
              {(title || company) && (
                <div className="flex items-center text-muted-foreground text-sm">
                  {title && <span>{title}</span>}
                  {company && title && <span className="mx-1">at</span>}
                  {company && (
                    <div className="flex items-center gap-1.5">
                      {companyLogo && !logoError ? (
                        <div className="h-4 w-4 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={companyLogo || "/placeholder.svg"}
                            alt={company}
                            className="h-full w-full object-contain"
                            onError={() => setLogoError(true)}
                          />
                        </div>
                      ) : (
                        <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span>{company}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <AIInsightFlowCompact onComplete={handleComplete} />
        </div>

        {isComplete && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold mb-2">Analysis Complete!</h2>
            <p className="text-muted-foreground mb-4 text-sm">We've identified the perfect gifts for {name}</p>
            <Button size="lg" onClick={handleContinue} className="gap-2">
              View Gift Recommendations
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

