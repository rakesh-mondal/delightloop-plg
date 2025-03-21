"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Linkedin,
  User,
  Briefcase,
  Award,
  BookOpen,
  MessageSquare,
  Globe,
  Zap,
  Target,
  Sparkles,
  Clock,
  Users,
  Heart,
  Coffee,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const SIGNALS = [
  {
    id: 1,
    name: "Professional Role",
    icon: Briefcase,
    description: "Analyzing current position and responsibilities",
  },
  {
    id: 2,
    name: "Industry Experience",
    icon: Globe,
    description: "Evaluating industry knowledge and background",
  },
  {
    id: 3,
    name: "Skills & Expertise",
    icon: Award,
    description: "Identifying key professional skills and expertise areas",
  },
  {
    id: 4,
    name: "Education Background",
    icon: BookOpen,
    description: "Reviewing educational qualifications and institutions",
  },
  {
    id: 5,
    name: "Content Engagement",
    icon: MessageSquare,
    description: "Analyzing post interactions and content preferences",
  },
  {
    id: 6,
    name: "Career Trajectory",
    icon: Target,
    description: "Mapping career progression and aspirations",
  },
  {
    id: 7,
    name: "Network Connections",
    icon: Users,
    description: "Evaluating professional network and relationships",
  },
  {
    id: 8,
    name: "Interests & Causes",
    icon: Heart,
    description: "Identifying personal interests and supported causes",
  },
  {
    id: 9,
    name: "Activity Patterns",
    icon: Clock,
    description: "Analyzing platform usage and engagement patterns",
  },
  {
    id: 10,
    name: "Content Creation",
    icon: Lightbulb,
    description: "Evaluating published articles and thought leadership",
  },
  {
    id: 11,
    name: "Endorsements",
    icon: Zap,
    description: "Analyzing skill endorsements and recommendations",
  },
  {
    id: 12,
    name: "Group Memberships",
    icon: Users,
    description: "Reviewing professional groups and communities",
  },
  {
    id: 13,
    name: "Work Preferences",
    icon: Coffee,
    description: "Identifying work style and environment preferences",
  },
  {
    id: 14,
    name: "Achievement Patterns",
    icon: Sparkles,
    description: "Recognizing patterns in accomplishments and recognition",
  },
]

interface SignalProcessingProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  recipientImage?: string
}

export function SignalProcessing({
  recipientName,
  recipientTitle,
  recipientCompany,
  recipientImage,
}: SignalProcessingProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [completedSignals, setCompletedSignals] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Start the animation sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1

        // Update current signal based on progress
        const signalIndex = Math.min(Math.floor((newProgress / 100) * SIGNALS.length), SIGNALS.length - 1)

        if (signalIndex > currentSignalIndex) {
          setCurrentSignalIndex(signalIndex)
          setCompletedSignals((prev) => [...prev, signalIndex])
        }

        // Check if complete
        if (newProgress >= 100) {
          clearInterval(interval)

          // Add a small delay before showing the complete state
          setTimeout(() => {
            setIsComplete(true)
          }, 500)

          // Add a delay before redirecting to gift selection
          setTimeout(() => {
            router.push("/gift-selection")
          }, 2500)
        }

        return newProgress > 100 ? 100 : newProgress
      })
    }, 180) // Speed of the progress bar

    return () => clearInterval(interval)
  }, [currentSignalIndex, router])

  const currentSignal = SIGNALS[currentSignalIndex]
  const CurrentIcon = currentSignal?.icon || Linkedin

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
            <Linkedin className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Analyzing LinkedIn Profile</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our AI is processing 14 different signals from {recipientName}'s profile to find the perfect gift
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {recipientImage ? (
                <img
                  src={recipientImage || "/placeholder.svg"}
                  alt={recipientName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-medium">{recipientName}</h2>
              {(recipientTitle || recipientCompany) && (
                <p className="text-muted-foreground">
                  {recipientTitle}
                  {recipientCompany && recipientTitle && " at "}
                  {recipientCompany}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Signal Processing</span>
                <span>
                  {Math.min(currentSignalIndex + 1, SIGNALS.length)} of {SIGNALS.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 animate-pulse">
                <CurrentIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{currentSignal?.name || "Initializing..."}</h3>
                <p className="text-sm text-muted-foreground">{currentSignal?.description || "Preparing analysis..."}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {SIGNALS.map((signal, index) => {
                const Icon = signal.icon
                const isActive = completedSignals.includes(index) || index === currentSignalIndex

                return (
                  <div
                    key={signal.id}
                    className={`flex flex-col items-center p-2 rounded-md transition-all ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${
                        isActive ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center">{signal.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
            <p className="text-muted-foreground mb-6">
              We've identified the perfect gifts based on {recipientName}'s profile
            </p>
            <Button size="lg" onClick={() => router.push("/gift-selection")} className="gap-2">
              View Gift Recommendations
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

