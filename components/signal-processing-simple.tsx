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

interface SignalProcessingSimpleProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  recipientImage?: string
}

export function SignalProcessingSimple({
  recipientName,
  recipientTitle,
  recipientCompany,
  recipientImage,
}: SignalProcessingSimpleProps) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-blue-100 text-blue-600 rounded-full mb-3 sm:mb-4">
            <Linkedin className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Analyzing LinkedIn Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-2">
            Our AI is processing 14 different signals from {recipientName}'s profile to find the perfect gift
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Profile section */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 pb-4 sm:mb-6 sm:pb-6 border-b">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {recipientImage ? (
                <img
                  src={recipientImage || "/placeholder.svg"}
                  alt={recipientName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium">{recipientName}</h2>
              {(recipientTitle || recipientCompany) && (
                <p className="text-sm sm:text-base text-muted-foreground">
                  {recipientTitle}
                  {recipientCompany && recipientTitle && " at "}
                  {recipientCompany}
                </p>
              )}
            </div>
          </div>

          {/* Progress section */}
          <div className="space-y-4 sm:space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Signal Processing</span>
                <span>
                  {Math.min(currentSignalIndex + 1, SIGNALS.length)} of {SIGNALS.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Current signal */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 animate-pulse">
                <CurrentIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base">{currentSignal?.name || "Initializing..."}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {currentSignal?.description || "Preparing analysis..."}
                </p>
              </div>
            </div>

            {/* Signal grid */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
              {SIGNALS.map((signal, index) => {
                const Icon = signal.icon
                const isActive = completedSignals.includes(index) || index === currentSignalIndex

                return (
                  <div
                    key={signal.id}
                    className={`flex flex-col items-center p-1 sm:p-2 rounded-md transition-all ${
                      isActive ? "text-blue-600" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center mb-1 ${
                        isActive ? "bg-blue-100" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-center line-clamp-2">{signal.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Completion state */}
        {isComplete && (
          <div className="text-center animate-fade-in px-4">
            <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-green-100 text-green-700 rounded-full mb-3 sm:mb-4">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Analysis Complete!</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              We've identified the perfect gifts based on {recipientName}'s profile
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/gift-selection")}
              className="gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              View Gift Recommendations
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

