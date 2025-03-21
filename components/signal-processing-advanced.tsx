"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useAnimation, type Variants } from "framer-motion"
import { User, Briefcase, MessageSquare, Sparkles, Heart, Lightbulb, Brain, Cpu, Network } from "lucide-react"

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
    icon: Network,
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

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

interface SignalProcessingAdvancedProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  recipientImage?: string
}

export function SignalProcessingAdvanced({
  recipientName,
  recipientTitle,
  recipientCompany,
  recipientImage,
}: SignalProcessingAdvancedProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [completedSignals, setCompletedSignals] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [insightText, setInsightText] = useState("Initializing AI analysis...")
  const controls = useAnimation()
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

  // Start the animation sequence
  useEffect(() => {
    controls.start("visible")

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
  }, [currentSignalIndex, controls, router, insights])

  const currentSignal = ALL_SIGNALS[currentSignalIndex]
  const CurrentIcon = currentSignal?.icon || Brain

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-6 sm:py-8 md:py-12 overflow-hidden relative">
      {/* Particle background - removed for better performance */}

      <motion.div
        ref={containerRef}
        className="w-full max-w-4xl mx-auto z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-4 sm:mb-6 md:mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center p-2 sm:p-3 bg-blue-100 text-blue-600 rounded-full mb-3 sm:mb-4"
            variants={pulseVariants}
            animate="pulse"
          >
            <Cpu className="h-6 w-6 sm:h-8 sm:w-8" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Signal Processing
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-2">
            Our AI is analyzing {ALL_SIGNALS.length} unique signals from {recipientName}'s LinkedIn profile
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          variants={itemVariants}
        >
          {/* Profile section */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-gray-200">
                {recipientImage ? (
                  <img
                    src={recipientImage || "/placeholder.svg"}
                    alt={recipientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                )}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-medium">{recipientName}</h2>
                {(recipientTitle || recipientCompany) && (
                  <p className="text-sm sm:text-base text-gray-500">
                    {recipientTitle}
                    {recipientCompany && recipientTitle && " at "}
                    {recipientCompany}
                  </p>
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
                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>Signal Processing</span>
                  <span>
                    {Math.min(currentSignalIndex + 1, ALL_SIGNALS.length)} of {ALL_SIGNALS.length}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
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
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br ${currentSignal?.color || "from-blue-500 to-blue-600"}`}
                    variants={pulseVariants}
                    animate="pulse"
                  >
                    <CurrentIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{currentSignal?.name || "Initializing..."}</h3>
                    <motion.p
                      className="text-xs sm:text-sm text-gray-600"
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
                  className="p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-1">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-purple-600 mb-1">AI Insight</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{insightText}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Signal categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
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
                        isActive ? `border-${category.borderColor} bg-gray-50` : "border-gray-200 bg-white"
                      } flex flex-col items-center`}
                      variants={itemVariants}
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

              {/* Neural network visualization - simplified for better performance */}
              <div className="relative h-24 sm:h-32 overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
                <svg width="100%" height="100%" viewBox="0 0 800 150" className="absolute inset-0">
                  {/* Nodes */}
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

                  {/* Simplified connections for better performance */}
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Completion state */}
        <AnimatePresence>
          {isComplete && (
            <motion.div className="mt-6 sm:mt-8 text-center" variants={fadeInUp} initial="hidden" animate="visible">
              <motion.div
                className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-3 sm:mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                Analysis Complete!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                We've identified the perfect gifts based on {recipientName}'s profile
              </p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <button
                  onClick={() => router.push("/gift-selection")}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm sm:text-base font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  View Gift Recommendations
                  <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

