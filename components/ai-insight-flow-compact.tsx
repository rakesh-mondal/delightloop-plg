"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, MessageSquare, Sparkles, Users, Heart, Lightbulb, Brain, Cpu } from "lucide-react"

// Define signal categories with their respective icons and colors
const SIGNAL_CATEGORIES = [
  {
    id: "professional",
    name: "Professional",
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500",
    signals: [
      { id: 1, name: "Role Analysis", description: "Analyzing current position and responsibilities" },
      { id: 2, name: "Industry Context", description: "Evaluating industry knowledge and background" },
      { id: 3, name: "Career Trajectory", description: "Mapping career progression and aspirations" },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    icon: Lightbulb,
    color: "from-amber-500 to-amber-600",
    textColor: "text-amber-600",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-500",
    signals: [
      { id: 4, name: "Skill Assessment", description: "Identifying key professional skills and expertise areas" },
      { id: 5, name: "Education Analysis", description: "Reviewing educational qualifications and institutions" },
      { id: 6, name: "Endorsement Patterns", description: "Analyzing skill endorsements and recommendations" },
    ],
  },
  {
    id: "engagement",
    name: "Engagement",
    icon: MessageSquare,
    color: "from-green-500 to-green-600",
    textColor: "text-green-600",
    borderColor: "border-green-500",
    bgColor: "bg-green-500",
    signals: [
      { id: 7, name: "Content Interaction", description: "Analyzing post interactions and content preferences" },
      { id: 8, name: "Activity Patterns", description: "Evaluating platform usage and engagement patterns" },
      { id: 9, name: "Content Creation", description: "Analyzing published content and thought leadership" },
    ],
  },
  {
    id: "network",
    name: "Network",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-500",
    bgColor: "bg-indigo-500",
    signals: [
      { id: 10, name: "Connection Analysis", description: "Evaluating professional network and relationships" },
      { id: 11, name: "Group Memberships", description: "Reviewing professional groups and communities" },
      { id: 12, name: "Influence Mapping", description: "Assessing network influence and reach" },
    ],
  },
  {
    id: "personal",
    name: "Personal",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
    textColor: "text-rose-600",
    borderColor: "border-rose-500",
    bgColor: "bg-rose-500",
    signals: [
      { id: 13, name: "Interest Analysis", description: "Identifying personal interests and supported causes" },
      { id: 14, name: "Work Preferences", description: "Determining work style and environment preferences" },
    ],
  },
]

// Flatten all signals for processing
const ALL_SIGNALS = SIGNAL_CATEGORIES.flatMap((category) =>
  category.signals.map((signal) => ({
    ...signal,
    category: category.id,
    categoryName: category.name,
    color: category.color,
    textColor: category.textColor,
    borderColor: category.borderColor,
    bgColor: category.bgColor,
    icon: category.icon,
  })),
)

// AI Insights based on signals
const AI_INSIGHTS = [
  {
    id: 1,
    title: "Professional Profile",
    content: "Subject shows strong leadership qualities and strategic thinking in marketing roles.",
    category: "professional",
  },
  {
    id: 2,
    title: "Technical Aptitude",
    content: "Demonstrates interest in marketing technology and data-driven approaches.",
    category: "skills",
  },
  {
    id: 3,
    title: "Content Preferences",
    content: "Regularly engages with content about business strategy, marketing trends, and coffee.",
    category: "engagement",
  },
  {
    id: 4,
    title: "Network Analysis",
    content: "Well-connected within marketing and technology sectors with high engagement rate.",
    category: "network",
  },
  {
    id: 5,
    title: "Personal Interests",
    content: "Shows affinity for premium coffee, business literature, and productivity tools.",
    category: "personal",
  },
]

interface AIInsightFlowCompactProps {
  onComplete?: () => void
  autoComplete?: boolean
  completionDelay?: number
}

export function AIInsightFlowCompact({
  onComplete,
  autoComplete = true,
  completionDelay = 12000,
}: AIInsightFlowCompactProps) {
  const [activeSignalIndex, setActiveSignalIndex] = useState(0)
  const [activeInsightIndex, setActiveInsightIndex] = useState(-1)
  const [dataParticles, setDataParticles] = useState<any[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Generate a new data particle
  const generateDataParticle = (signalIndex: number) => {
    const signal = ALL_SIGNALS[signalIndex]
    if (!signal) return null

    return {
      id: `particle-${Date.now()}-${Math.random()}`,
      signalIndex,
      category: signal.category,
      color: signal.bgColor,
    }
  }

  // Progress through signals and insights
  useEffect(() => {
    if (isComplete) return

    // Signal progression
    const signalInterval = setInterval(() => {
      setActiveSignalIndex((prev) => {
        const next = prev + 1

        // Generate new data particle
        const newParticle = generateDataParticle(prev)
        if (newParticle) {
          setDataParticles((prev) => [...prev, newParticle])
        }

        // Trigger insight after every 3 signals
        if (next % 3 === 0) {
          const insightIndex = Math.floor(next / 3) - 1
          if (insightIndex < AI_INSIGHTS.length) {
            setTimeout(() => {
              setActiveInsightIndex(insightIndex)
            }, 500)
          }
        }

        // Check if we've reached the end
        if (next >= ALL_SIGNALS.length) {
          clearInterval(signalInterval)

          // Set completion after a delay
          if (autoComplete) {
            setTimeout(() => {
              setIsComplete(true)
              if (onComplete) onComplete()
            }, 2000)
          }

          return ALL_SIGNALS.length - 1
        }

        return next
      })
    }, 800) // Speed of signal progression

    // Auto-complete after delay if enabled
    let completionTimer: NodeJS.Timeout
    if (autoComplete) {
      completionTimer = setTimeout(() => {
        setIsComplete(true)
        if (onComplete) onComplete()
      }, completionDelay)
    }

    return () => {
      clearInterval(signalInterval)
      if (completionTimer) clearTimeout(completionTimer)
    }
  }, [autoComplete, completionDelay, isComplete, onComplete])

  // Clean up old particles
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setDataParticles((prev) => {
        // Keep only the last 10 particles to avoid performance issues
        if (prev.length > 10) {
          return prev.slice(prev.length - 10)
        }
        return prev
      })
    }, 5000)

    return () => clearInterval(cleanupInterval)
  }, [])

  // Get current signal
  const currentSignal = ALL_SIGNALS[activeSignalIndex]
  const CurrentIcon = currentSignal?.icon || Brain

  // Find the category of the current signal
  const currentCategory = currentSignal?.category || null

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 to-purple-900 border border-purple-800 p-3">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 246, 0.3)`,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Cpu className="h-3 w-3 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xs font-medium text-white">AI Signal Processing</h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-green-400"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <span className="text-[10px] text-green-300">Processing</span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left column: Signal cards */}
        <div className="md:col-span-2 space-y-3">
          {/* Signal categories */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {SIGNAL_CATEGORIES.slice(0, 3).map((category) => {
              const isActive = currentCategory === category.id
              const completedCount = category.signals.filter(
                (signal) => ALL_SIGNALS.findIndex((s) => s.id === signal.id) <= activeSignalIndex,
              ).length
              const progress = (completedCount / category.signals.length) * 100

              return (
                <motion.div
                  key={category.id}
                  className={`p-1.5 rounded-md border ${
                    isActive ? `${category.borderColor} bg-gray-800/50` : "border-gray-700 bg-gray-800/30"
                  } flex flex-col items-center`}
                  animate={isActive ? { scale: 1.05, y: -3 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mb-1 ${
                      isActive ? `bg-gradient-to-br ${category.color}` : "bg-gray-700"
                    }`}
                  >
                    <category.icon className={`h-3 w-3 ${isActive ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <span className={`text-[9px] font-medium text-center ${isActive ? "text-white" : "text-gray-400"}`}>
                    {category.name}
                  </span>
                  <div className="w-full h-0.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      className={`h-full ${isActive ? category.bgColor : "bg-gray-600"}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Current signal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSignalIndex}
              className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-md border border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br ${currentSignal?.color || "from-purple-500 to-purple-600"}`}
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
                <CurrentIcon className="h-4 w-4 text-white" />
              </motion.div>
              <div>
                <motion.h3
                  className="text-xs font-medium text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentSignal?.name || "Initializing..."}
                </motion.h3>
                <motion.p
                  className="text-[10px] text-purple-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentSignal?.description || "Preparing analysis..."}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Signal grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {ALL_SIGNALS.slice(0, 6).map((signal, index) => {
              const Icon = signal.icon
              const isActive = index === activeSignalIndex
              const isCompleted = index < activeSignalIndex

              return (
                <motion.div
                  key={signal.id}
                  className={`flex items-center gap-1.5 p-1.5 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-800/70 border border-purple-500"
                      : isCompleted
                        ? "bg-gray-800/30 border border-gray-700"
                        : "bg-gray-800/10 border border-gray-800"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isCompleted || isActive ? 1 : 0.5,
                    y: 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <motion.div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      isActive || isCompleted ? `bg-gradient-to-br ${signal.color}` : "bg-gray-700"
                    }`}
                    animate={
                      isActive
                        ? {
                            y: [0, -2, 0],
                          }
                        : {}
                    }
                    transition={
                      isActive
                        ? {
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                  >
                    <Icon className={`h-3 w-3 ${isActive || isCompleted ? "text-white" : "text-gray-400"}`} />
                  </motion.div>
                  <span
                    className={`text-[9px] ${
                      isActive ? "text-white font-medium" : isCompleted ? "text-purple-200" : "text-gray-400"
                    }`}
                  >
                    {signal.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right column: AI Insights */}
        <div className="space-y-3">
          {/* Data flow visualization */}
          <motion.div
            className="h-16 bg-gray-800/30 rounded-md border border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0">
              <svg width="100%" height="100%" viewBox="0 0 300 100" className="absolute inset-0">
                {/* Neural network nodes */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={`input-${i}`}
                    cx={30}
                    cy={20 + i * 15}
                    r={2}
                    fill="#9333EA"
                    initial={{ opacity: 0.4 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {[...Array(7)].map((_, i) => (
                  <motion.circle
                    key={`hidden-${i}`}
                    cx={150}
                    cy={15 + i * 12}
                    r={2}
                    fill="#A78BFA"
                    initial={{ opacity: 0.4 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}

                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={`output-${i}`}
                    cx={270}
                    cy={30 + i * 20}
                    r={3}
                    fill="#C084FC"
                    initial={{ opacity: 0.4 }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}

                {/* Data flow paths */}
                <path
                  d="M 30 35 C 90 35, 90 45, 150 45"
                  stroke="#9333EA"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  className="data-flow-path"
                />
                <path
                  d="M 30 65 C 90 65, 90 75, 150 75"
                  stroke="#9333EA"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  className="data-flow-path"
                />
                <path
                  d="M 150 45 C 210 45, 210 30, 270 30"
                  stroke="#A78BFA"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  className="data-flow-path"
                />
                <path
                  d="M 150 75 C 210 75, 210 70, 270 70"
                  stroke="#A78BFA"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2,2"
                  className="data-flow-path"
                />
              </svg>

              {/* Dynamic data particles */}
              <AnimatePresence>
                {dataParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className={`absolute h-1.5 w-1.5 rounded-full ${particle.color || "bg-purple-500"}`}
                    initial={{
                      left: "10%",
                      top: "50%",
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={[
                      // Start
                      {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3 },
                      },
                      // Move to middle
                      {
                        left: "50%",
                        top: `${30 + Math.random() * 40}%`,
                        transition: { duration: 0.8, delay: 0.3 },
                      },
                      // Move to end
                      {
                        left: "90%",
                        top: `${30 + Math.random() * 40}%`,
                        transition: { duration: 0.8, delay: 1.1 },
                      },
                      // Fade out
                      {
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.3, delay: 1.9 },
                      },
                    ]}
                    exit={{ opacity: 0 }}
                  />
                ))}
              </AnimatePresence>
            </div>
            <div className="absolute bottom-1 left-1 text-[8px] text-purple-200">Neural Network</div>
          </motion.div>

          {/* AI Insights */}
          <div className="space-y-2">
            {activeInsightIndex >= 0 && activeInsightIndex < AI_INSIGHTS.length && (
              <motion.div
                key={AI_INSIGHTS[activeInsightIndex].id}
                className="p-2 rounded-md border bg-gray-800/50 border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <div className="flex items-start gap-1.5">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center">
                    <Brain className="h-2 w-2 text-white" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-medium text-white">{AI_INSIGHTS[activeInsightIndex].title}</h5>
                    <p className="text-[9px] text-purple-200 mt-0.5">{AI_INSIGHTS[activeInsightIndex].content}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Completion state */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-md border border-green-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: 3,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-[10px] font-medium text-white">Analysis Complete</h3>
                    <p className="text-[8px] text-green-200">Gift recommendations ready</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

