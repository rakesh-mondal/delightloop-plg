"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Linkedin, User, Briefcase, MessageSquare, Sparkles, Users, Heart, Lightbulb, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define signal categories with their respective icons and colors
const SIGNAL_CATEGORIES = [
  {
    id: "professional",
    name: "Professional",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",
    bgColor: "bg-blue-500",
    signals: [
      { id: 1, name: "Role Analysis", description: "Analyzing current position and responsibilities" },
      { id: 2, name: "Industry Context", description: "Evaluating industry knowledge and background" },
      { id: 3, name: "Career Trajectory", description: "Mapping career progression and aspirations" },
    ],
  },
  {
    id: "skills",
    name: "Skills & Knowledge",
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
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500",
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

interface SignalProcessingDynamicProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  recipientImage?: string
}

export function SignalProcessingDynamic({
  recipientName,
  recipientTitle,
  recipientCompany,
  recipientImage,
}: SignalProcessingDynamicProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [completedSignals, setCompletedSignals] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [insightText, setInsightText] = useState("Initializing AI analysis...")
  const [dataParticles, setDataParticles] = useState<any[]>([])
  const [activeNodes, setActiveNodes] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Tooltip messages for neural network nodes
  const nodeTooltips = {
    input: [
      "Processing profile headline data",
      "Analyzing job title information",
      "Extracting company details",
      "Processing education history",
      "Analyzing skills endorsements",
      "Processing connection network",
      "Extracting post engagement patterns",
      "Analyzing content creation history",
    ],
    hidden1: [
      "Identifying professional interests",
      "Mapping career trajectory",
      "Calculating industry expertise level",
      "Determining leadership qualities",
      "Analyzing communication style",
      "Mapping technical proficiency",
      "Evaluating creative tendencies",
      "Identifying strategic thinking patterns",
      "Calculating networking effectiveness",
      "Determining personal brand strength",
    ],
    hidden2: [
      "Synthesizing professional identity",
      "Calculating gift relevance scores",
      "Mapping personal taste indicators",
      "Determining price sensitivity",
      "Analyzing aesthetic preferences",
      "Evaluating practical vs. luxury orientation",
      "Identifying status signaling patterns",
      "Calculating lifestyle indicators",
    ],
    output: [
      "Gift category recommendation",
      "Price range determination",
      "Style preference analysis",
      "Personalization factor calculation",
    ],
  }

  // Generate data particles for animation
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

  // Activate random nodes in the neural network
  const activateRandomNodes = () => {
    const totalNodes = 30 // Total number of nodes in our network
    const nodesToActivate = Math.floor(Math.random() * 5) + 3 // Activate 3-7 nodes

    const newActiveNodes = []
    for (let i = 0; i < nodesToActivate; i++) {
      newActiveNodes.push(Math.floor(Math.random() * totalNodes))
    }

    setActiveNodes(newActiveNodes)
  }

  // Start the animation sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.5

        // Update current signal based on progress
        const signalIndex = Math.min(Math.floor((newProgress / 100) * ALL_SIGNALS.length), ALL_SIGNALS.length - 1)

        if (signalIndex > currentSignalIndex) {
          setCurrentSignalIndex(signalIndex)
          setCompletedSignals((prev) => [...prev, signalIndex])
          setInsightText(insights[signalIndex] || "Processing data...")

          // Update active category
          const currentSignal = ALL_SIGNALS[signalIndex]
          if (currentSignal) {
            setActiveCategory(currentSignal.category)
          }

          // Generate new data particles
          const newParticle = generateDataParticle(signalIndex)
          if (newParticle) {
            setDataParticles((prev) => [...prev, newParticle])
          }

          // Activate random nodes in the neural network
          activateRandomNodes()
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

  const currentSignal = ALL_SIGNALS[currentSignalIndex]
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
      <div className="w-full max-w-4xl mx-auto z-10" ref={containerRef}>
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
            Our AI is processing {ALL_SIGNALS.length} unique signals from {recipientName}'s profile to find the perfect
            gift
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
                    {Math.min(currentSignalIndex + 1, ALL_SIGNALS.length)} of {ALL_SIGNALS.length}
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

              {/* Integrated Neural Network and Signal Cards */}
              <div className="mt-6 relative">
                {/* Signal categories */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
                  {SIGNAL_CATEGORIES.map((category) => {
                    const isActive = activeCategory === category.id
                    const completedCount = category.signals.filter((signal) =>
                      completedSignals.includes(ALL_SIGNALS.findIndex((s) => s.id === signal.id)),
                    ).length
                    const progress = (completedCount / category.signals.length) * 100

                    return (
                      <motion.div
                        key={category.id}
                        className={`p-2 sm:p-3 rounded-xl border ${
                          isActive ? `${category.borderColor} bg-gray-50` : "border-gray-200 bg-white"
                        } flex flex-col items-center`}
                        animate={isActive ? { scale: 1.03, y: -5 } : { scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                            isActive ? `bg-gradient-to-br ${category.color}` : "bg-gray-100"
                          }`}
                        >
                          <category.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-white" : "text-gray-500"}`}
                          />
                        </div>
                        <span
                          className={`text-[10px] sm:text-xs font-medium text-center ${isActive ? category.textColor : "text-gray-500"}`}
                        >
                          {category.name}
                        </span>
                        <div className="w-full h-1 bg-gray-100 rounded-full mt-1 sm:mt-2 overflow-hidden">
                          <motion.div
                            className={`h-full ${isActive ? category.bgColor : "bg-gray-300"}`}
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut" }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-500 mt-1">
                          {completedCount}/{category.signals.length}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Neural network visualization with dynamic connections */}
                <div className="relative h-64 sm:h-80 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-indigo-900 border border-indigo-800">
                  {/* Neural network nodes */}
                  <svg width="100%" height="100%" viewBox="0 0 800 300" className="absolute inset-0">
                    {/* Layer labels */}
                    <text x="100" y="10" textAnchor="middle" fill="#94A3B8" fontSize="12">
                      Input Layer
                    </text>
                    <text x="300" y="10" textAnchor="middle" fill="#94A3B8" fontSize="12">
                      Hidden Layer 1
                    </text>
                    <text x="500" y="10" textAnchor="middle" fill="#94A3B8" fontSize="12">
                      Hidden Layer 2
                    </text>
                    <text x="700" y="10" textAnchor="middle" fill="#94A3B8" fontSize="12">
                      Output Layer
                    </text>

                    {/* Input layer nodes */}
                    {[...Array(8)].map((_, i) => (
                      <TooltipProvider key={`input-tooltip-${i}`}>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <motion.circle
                              key={`input-${i}`}
                              cx={100}
                              cy={40 + i * 30}
                              r={6}
                              fill={activeNodes.includes(i) ? "#3B82F6" : "#1E293B"}
                              stroke={activeNodes.includes(i) ? "#60A5FA" : "#475569"}
                              strokeWidth="1"
                              initial={{ opacity: 0.4 }}
                              animate={{
                                opacity: activeNodes.includes(i) ? 1 : 0.4,
                                scale: activeNodes.includes(i) ? 1.5 : 1,
                                fill: activeNodes.includes(i) ? "#3B82F6" : "#1E293B",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-blue-900 text-white border-blue-700 text-xs max-w-[200px]"
                          >
                            <p>{nodeTooltips.input[i]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {/* Hidden layer 1 nodes */}
                    {[...Array(10)].map((_, i) => (
                      <TooltipProvider key={`hidden1-tooltip-${i}`}>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <motion.circle
                              key={`hidden1-${i}`}
                              cx={300}
                              cy={30 + i * 25}
                              r={6}
                              fill={activeNodes.includes(i + 8) ? "#818CF8" : "#1E293B"}
                              stroke={activeNodes.includes(i + 8) ? "#A5B4FC" : "#475569"}
                              strokeWidth="1"
                              initial={{ opacity: 0.4 }}
                              animate={{
                                opacity: activeNodes.includes(i + 8) ? 1 : 0.4,
                                scale: activeNodes.includes(i + 8) ? 1.5 : 1,
                                fill: activeNodes.includes(i + 8) ? "#818CF8" : "#1E293B",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-indigo-900 text-white border-indigo-700 text-xs max-w-[200px]"
                          >
                            <p>{nodeTooltips.hidden1[i]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {/* Hidden layer 2 nodes */}
                    {[...Array(8)].map((_, i) => (
                      <TooltipProvider key={`hidden2-tooltip-${i}`}>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <motion.circle
                              key={`hidden2-${i}`}
                              cx={500}
                              cy={40 + i * 30}
                              r={6}
                              fill={activeNodes.includes(i + 18) ? "#C084FC" : "#1E293B"}
                              stroke={activeNodes.includes(i + 18) ? "#DDD6FE" : "#475569"}
                              strokeWidth="1"
                              initial={{ opacity: 0.4 }}
                              animate={{
                                opacity: activeNodes.includes(i + 18) ? 1 : 0.4,
                                scale: activeNodes.includes(i + 18) ? 1.5 : 1,
                                fill: activeNodes.includes(i + 18) ? "#C084FC" : "#1E293B",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-purple-900 text-white border-purple-700 text-xs max-w-[200px]"
                          >
                            <p>{nodeTooltips.hidden2[i]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {/* Output layer nodes */}
                    {[...Array(4)].map((_, i) => (
                      <TooltipProvider key={`output-tooltip-${i}`}>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <motion.circle
                              key={`output-${i}`}
                              cx={700}
                              cy={60 + i * 50}
                              r={8}
                              fill={activeNodes.includes(i + 26) ? "#F472B6" : "#1E293B"}
                              stroke={activeNodes.includes(i + 26) ? "#FBCFE8" : "#475569"}
                              strokeWidth="1"
                              initial={{ opacity: 0.4 }}
                              animate={{
                                opacity: activeNodes.includes(i + 26) ? 1 : 0.4,
                                scale: activeNodes.includes(i + 26) ? 1.5 : 1,
                                fill: activeNodes.includes(i + 26) ? "#F472B6" : "#1E293B",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="bg-pink-900 text-white border-pink-700 text-xs max-w-[200px]"
                          >
                            <p>{nodeTooltips.output[i]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {/* Static connections between layers */}
                    <g opacity="0.2">
                      {/* Input to hidden layer 1 connections */}
                      {[...Array(8)].map((_, i) =>
                        [...Array(10)].map((_, j) => (
                          <line
                            key={`l1-${i}-${j}`}
                            x1={100}
                            y1={40 + i * 30}
                            x2={300}
                            y2={30 + j * 25}
                            stroke="#64748B"
                            strokeWidth="1"
                          />
                        )),
                      )}

                      {/* Hidden layer 1 to hidden layer 2 connections */}
                      {[...Array(10)].map((_, i) =>
                        [...Array(8)].map((_, j) => (
                          <line
                            key={`l2-${i}-${j}`}
                            x1={300}
                            y1={30 + i * 25}
                            x2={500}
                            y2={40 + j * 30}
                            stroke="#64748B"
                            strokeWidth="1"
                          />
                        )),
                      )}

                      {/* Hidden layer 2 to output connections */}
                      {[...Array(8)].map((_, i) =>
                        [...Array(4)].map((_, j) => (
                          <line
                            key={`l3-${i}-${j}`}
                            x1={500}
                            y1={40 + i * 30}
                            x2={700}
                            y2={60 + j * 50}
                            stroke="#64748B"
                            strokeWidth="1"
                          />
                        )),
                      )}
                    </g>

                    {/* Dynamic data particles */}
                    <AnimatePresence>
                      {dataParticles.map((particle, index) => {
                        // Create a path for the particle to follow
                        // This will go from the signal card to a random input node, then through the network
                        const inputNodeIndex = Math.floor(Math.random() * 8)
                        const hiddenNode1Index = Math.floor(Math.random() * 10)
                        const hiddenNode2Index = Math.floor(Math.random() * 8)
                        const outputNodeIndex = Math.floor(Math.random() * 4)

                        return (
                          <motion.circle
                            key={particle.id}
                            r={4}
                            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
                            initial={{
                              x: 100,
                              y: 40 + inputNodeIndex * 30,
                              opacity: 0,
                              scale: 0,
                            }}
                            animate={[
                              // Start at input node
                              {
                                x: 100,
                                y: 40 + inputNodeIndex * 30,
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.3 },
                              },
                              // Move to hidden layer 1
                              {
                                x: 300,
                                y: 30 + hiddenNode1Index * 25,
                                transition: { duration: 0.5, delay: 0.3 },
                              },
                              // Move to hidden layer 2
                              {
                                x: 500,
                                y: 40 + hiddenNode2Index * 30,
                                transition: { duration: 0.5, delay: 0.8 },
                              },
                              // Move to output layer
                              {
                                x: 700,
                                y: 60 + outputNodeIndex * 50,
                                transition: { duration: 0.5, delay: 1.3 },
                              },
                              // Fade out
                              {
                                opacity: 0,
                                scale: 0,
                                transition: { duration: 0.3, delay: 1.8 },
                              },
                            ]}
                            exit={{ opacity: 0, scale: 0 }}
                          />
                        )
                      })}
                    </AnimatePresence>

                    {/* Active connections based on current signal */}
                    {activeNodes.map((nodeIndex, i) => {
                      if (nodeIndex < 8) {
                        // Input layer node is active, connect to random hidden layer 1 node
                        const targetNodeIndex = 8 + Math.floor(Math.random() * 10)
                        if (activeNodes.includes(targetNodeIndex)) {
                          return (
                            <motion.line
                              key={`active-conn-${i}`}
                              x1={100}
                              y1={40 + nodeIndex * 30}
                              x2={300}
                              y2={30 + (targetNodeIndex - 8) * 25}
                              stroke="#60A5FA"
                              strokeWidth="2"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                          )
                        }
                      } else if (nodeIndex >= 8 && nodeIndex < 18) {
                        // Hidden layer 1 node is active, connect to random hidden layer 2 node
                        const targetNodeIndex = 18 + Math.floor(Math.random() * 8)
                        if (activeNodes.includes(targetNodeIndex)) {
                          return (
                            <motion.line
                              key={`active-conn-${i}`}
                              x1={300}
                              y1={30 + (nodeIndex - 8) * 25}
                              x2={500}
                              y2={40 + (targetNodeIndex - 18) * 30}
                              stroke="#A5B4FC"
                              strokeWidth="2"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                          )
                        }
                      } else if (nodeIndex >= 18 && nodeIndex < 26) {
                        // Hidden layer 2 node is active, connect to random output node
                        const targetNodeIndex = 26 + Math.floor(Math.random() * 4)
                        if (activeNodes.includes(targetNodeIndex)) {
                          return (
                            <motion.line
                              key={`active-conn-${i}`}
                              x1={500}
                              y1={40 + (nodeIndex - 18) * 30}
                              x2={700}
                              y2={60 + (targetNodeIndex - 26) * 50}
                              stroke="#DDD6FE"
                              strokeWidth="2"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                          )
                        }
                      }
                      return null
                    })}
                  </svg>

                  {/* Labels */}
                  <div className="absolute bottom-2 left-2 text-xs text-blue-200">Neural Network Processing</div>
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-green-400"
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
                    <span className="text-xs text-green-300">Active</span>
                  </div>

                  {/* Signal category connections to neural network */}
                  {SIGNAL_CATEGORIES.map((category, categoryIndex) => {
                    if (category.id === activeCategory) {
                      // Calculate position for the connection line
                      const categoryX = 80 + categoryIndex * 160 // Approximate x position of category in the grid
                      const categoryY = 40 // Approximate y position of the bottom of the category card

                      return (
                        <motion.div
                          key={`category-connection-${category.id}`}
                          className="absolute"
                          style={{
                            left: `${categoryX}px`,
                            top: `${categoryY}px`,
                            width: "2px",
                            height: "40px",
                            background: `linear-gradient(to bottom, ${category.bgColor}, transparent)`,
                          }}
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )
                    }
                    return null
                  })}
                </div>
              </div>
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

