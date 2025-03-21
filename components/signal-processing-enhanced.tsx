"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface SignalProcessingEnhancedProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  recipientImage?: string
}

export function SignalProcessingEnhanced({
  recipientName,
  recipientTitle,
  recipientCompany,
  recipientImage,
}: SignalProcessingEnhancedProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [completedSignals, setCompletedSignals] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [insightText, setInsightText] = useState("Initializing AI analysis...")

  // Insights based on current signal
  const insights = [
    "Analyzing professional background and experience...",
    "Evaluating industry expertise and domain knowledge...",
    "Mapping career progression patterns...",
    "Identifying key skills and competencies...",
    "Reviewing educational background and certifications...",
    "Analyzing endorsements and recommendations...",
    "Evaluating content engagement patterns...",
    "Analyzing platform activity and usage...",
    "Reviewing published content and thought leadership...",
    "Mapping professional network connections...",
    "Analyzing group memberships and communities...",
    "Evaluating network influence and reach...",
    "Identifying personal interests and causes...",
    "Determining work style preferences and environment fit...",
  ]

  useEffect(() => {
    // Start the animation sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.5

        // Update current signal based on progress
        const signalIndex = Math.min(Math.floor((newProgress / 100) * SIGNALS.length), SIGNALS.length - 1)

        if (signalIndex > currentSignalIndex) {
          setCurrentSignalIndex(signalIndex)
          setCompletedSignals((prev) => [...prev, signalIndex])
          setInsightText(insights[signalIndex] || "Processing data...")
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
          }, 3500)
        }

        return newProgress > 100 ? 100 : newProgress
      })
    }, 120) // Speed of the progress bar

    return () => clearInterval(interval)
  }, [currentSignalIndex, router, insights])

  const currentSignal = SIGNALS[currentSignalIndex]
  const CurrentIcon = currentSignal?.icon || Brain

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 px-4 py-6 sm:py-8 md:py-12 overflow-hidden relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 246, 0.5)`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="w-full max-w-4xl mx-auto z-10">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full mb-4 sm:mb-5"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Linkedin className="h-6 w-6 sm:h-8 sm:w-8" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Analyzing LinkedIn Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-2">
            Our AI is processing {SIGNALS.length} unique signals from {recipientName}'s profile to find the perfect gift
          </p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Profile section */}
          <div className="p-4 sm:p-6 border-b border-blue-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden ring-2 ring-blue-200"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {recipientImage ? (
                  <img
                    src={recipientImage || "/placeholder.svg"}
                    alt={recipientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
                )}
              </motion.div>
              <div>
                <motion.h2
                  className="text-lg sm:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {recipientName}
                </motion.h2>
                {(recipientTitle || recipientCompany) && (
                  <motion.p
                    className="text-sm sm:text-base text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {recipientTitle}
                    {recipientCompany && recipientTitle && " at "}
                    {recipientCompany}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-4 sm:p-6">
            {/* Progress visualization */}
            <div className="space-y-4 sm:space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Signal Processing</span>
                  <span>
                    {Math.min(currentSignalIndex + 1, SIGNALS.length)} of {SIGNALS.length}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    style={{ width: `${progress}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Current signal */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSignalIndex}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-500 to-indigo-500"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <CurrentIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="font-medium text-base sm:text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentSignal?.name || "Initializing..."}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentSignal?.description || "Preparing analysis..."}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* AI Insight */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={insightText}
                  className="p-4 sm:p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <motion.div
                      className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-indigo-700 mb-1">AI Insight</h4>
                      <p className="text-sm text-gray-600">{insightText}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Signal grid */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {SIGNALS.map((signal, index) => {
                  const Icon = signal.icon
                  const isActive = completedSignals.includes(index) || index === currentSignalIndex

                  return (
                    <motion.div
                      key={signal.id}
                      className={`flex flex-col items-center p-2 sm:p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
                          : "bg-white/60 border border-gray-100"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isActive ? 1.05 : 1,
                        boxShadow: isActive ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none",
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                    >
                      <motion.div
                        className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                          isActive ? "bg-gradient-to-br from-blue-500 to-indigo-500" : "bg-gray-100"
                        }`}
                        animate={
                          isActive
                            ? {
                                y: [0, -5, 0],
                                scale: [1, 1.05, 1],
                              }
                            : {}
                        }
                        transition={
                          isActive
                            ? {
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }
                            : {}
                        }
                      >
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                      </motion.div>
                      <span
                        className={`text-[10px] sm:text-xs text-center line-clamp-2 ${
                          isActive ? "text-blue-700 font-medium" : "text-gray-600"
                        }`}
                      >
                        {signal.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Neural network visualization */}
              <motion.div
                className="relative h-24 sm:h-32 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 800 150" className="absolute inset-0">
                  {/* Simplified neural network visualization */}
                  {[...Array(8)].map((_, i) => (
                    <motion.circle
                      key={`input-${i}`}
                      cx={100}
                      cy={20 + i * 16}
                      r={4}
                      fill={i <= currentSignalIndex % 8 ? "#3B82F6" : "#E5E7EB"}
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity: i <= currentSignalIndex % 8 ? 1 : 0.4,
                        scale: i === currentSignalIndex % 8 ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}

                  {[...Array(12)].map((_, i) => (
                    <motion.circle
                      key={`hidden1-${i}`}
                      cx={300}
                      cy={10 + i * 12}
                      r={4}
                      fill={i <= currentSignalIndex % 12 ? "#818CF8" : "#E5E7EB"}
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity: i <= currentSignalIndex % 12 ? 1 : 0.4,
                        scale: i === currentSignalIndex % 12 ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}

                  {[...Array(10)].map((_, i) => (
                    <motion.circle
                      key={`hidden2-${i}`}
                      cx={500}
                      cy={15 + i * 14}
                      r={4}
                      fill={i <= currentSignalIndex % 10 ? "#C084FC" : "#E5E7EB"}
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity: i <= currentSignalIndex % 10 ? 1 : 0.4,
                        scale: i === currentSignalIndex % 10 ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}

                  {[...Array(3)].map((_, i) => (
                    <motion.circle
                      key={`output-${i}`}
                      cx={700}
                      cy={50 + i * 25}
                      r={6}
                      fill={i <= currentSignalIndex % 3 ? "#F472B6" : "#E5E7EB"}
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity: i <= currentSignalIndex % 3 ? 1 : 0.4,
                        scale: i === currentSignalIndex % 3 ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}

                  {/* Simplified connections */}
                  <path
                    d="M 100 36 C 200 36, 200 46, 300 46"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                  <path
                    d="M 100 68 C 200 68, 200 82, 300 82"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                  <path
                    d="M 300 46 C 400 46, 400 43, 500 43"
                    stroke="#818CF8"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                  <path
                    d="M 300 82 C 400 82, 400 85, 500 85"
                    stroke="#818CF8"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                  <path
                    d="M 500 43 C 600 43, 600 50, 700 50"
                    stroke="#C084FC"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                  <path
                    d="M 500 85 C 600 85, 600 75, 700 75"
                    stroke="#C084FC"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity={0.3}
                    className="neural-connection"
                  />
                </svg>

                <div className="absolute bottom-2 left-2 text-xs text-gray-500">Neural Network Processing</div>

                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-green-500"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Completion state */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="mt-6 sm:mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                Analysis Complete!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                We've identified the perfect gifts based on {recipientName}'s profile
              </p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  onClick={() => router.push("/gift-selection")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  View Gift Recommendations
                  <Sparkles className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

