"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Brain, Cpu, Lightbulb, Zap } from "lucide-react"

interface AnimatedAIInsightsProps {
  recipientName: string
  recipientTitle?: string
  recipientCompany?: string
  insights: string[]
  className?: string
}

export function AnimatedAIInsights({
  recipientName,
  recipientTitle,
  recipientCompany,
  insights,
  className,
}: AnimatedAIInsightsProps) {
  const [activeInsightIndex, setActiveInsightIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [dataParticles, setDataParticles] = useState<any[]>([])

  // Generate a new data particle
  const generateDataParticle = () => {
    return {
      id: `particle-${Date.now()}-${Math.random()}`,
      color: Math.random() > 0.5 ? "bg-purple-500" : "bg-indigo-500",
    }
  }

  // Cycle through insights
  useEffect(() => {
    if (insights.length === 0) return

    // Start typing the first insight
    setIsTyping(true)
    let currentText = ""
    const currentInsight = insights[activeInsightIndex]
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex < currentInsight.length) {
        currentText += currentInsight[charIndex]
        setTypedText(currentText)
        charIndex++

        // Occasionally generate a data particle
        if (Math.random() > 0.8) {
          const newParticle = generateDataParticle()
          setDataParticles((prev) => [...prev, newParticle])
        }
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        // Move to next insight after a delay, but only if not the last insight
        if (insights.length > 1 && activeInsightIndex < insights.length - 1) {
          const nextInsightTimer = setTimeout(() => {
            setActiveInsightIndex((prev) => prev + 1)
          }, 3000) // Show each insight for 3 seconds

          return () => clearTimeout(nextInsightTimer)
        }
      }
    }, 30) // Typing speed

    return () => clearInterval(typingInterval)
  }, [activeInsightIndex, insights])

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
    }, 3000)

    return () => clearInterval(cleanupInterval)
  }, [])

  // Reset typing when active insight changes
  useEffect(() => {
    setTypedText("")
    setIsTyping(true)
  }, [activeInsightIndex])

  // Icons for the animation
  const icons = [Brain, Cpu, Lightbulb, Zap, Sparkles]

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border border-purple-500/50 p-3 ${className}`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
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
      <div className="relative z-10 flex items-center gap-2 mb-2">
        <motion.div
          className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center"
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
          <Brain className="h-3 w-3 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xs font-medium text-white flex items-center gap-2">
            AI Insights
            <motion.div
              className="h-1 w-1 rounded-full bg-green-400"
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
          </h3>
          <p className="text-[10px] text-purple-200">
            Analysis for {recipientName}
            {recipientTitle && `, ${recipientTitle}`}
            {recipientCompany && ` at ${recipientCompany}`}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-2">
        <div className="min-h-[40px] bg-purple-950/50 rounded-md border border-purple-800/50 p-2 relative">
          {/* Typing animation */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeInsightIndex}
              className="text-xs text-purple-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {typedText}
              {isTyping && (
                <motion.span
                  className="inline-block h-3 w-0.5 ml-0.5 bg-purple-300"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.p>
          </AnimatePresence>

          {/* Floating icons */}
          {icons.map((Icon, index) => (
            <motion.div
              key={`icon-${index}`}
              className="absolute"
              style={{
                left: `${10 + index * 20}%`,
                top: `${Math.random() * 80}%`,
                opacity: 0.1,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <Icon className="h-4 w-4 text-purple-300" />
            </motion.div>
          ))}

          {/* Dynamic data particles */}
          <AnimatePresence>
            {dataParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute h-1.5 w-1.5 rounded-full ${particle.color}`}
                initial={{
                  left: "10%",
                  top: "50%",
                  opacity: 0,
                  scale: 0,
                }}
                animate={[
                  // Start
                  {
                    opacity: 0.7,
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                  // Random movement
                  {
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    transition: { duration: 2 },
                  },
                  // Fade out
                  {
                    opacity: 0,
                    scale: 0,
                    transition: { duration: 0.5, delay: 1.5 },
                  },
                ]}
                exit={{ opacity: 0 }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        {insights.length > 1 && (
          <div className="flex justify-center mt-3 gap-1.5">
            {insights.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === activeInsightIndex ? "bg-purple-400" : "bg-purple-800"
                }`}
                animate={
                  index === activeInsightIndex
                    ? {
                        scale: [1, 1.3, 1],
                      }
                    : {}
                }
                transition={
                  index === activeInsightIndex
                    ? {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                    : {}
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Neural network visualization */}
      <div className="relative z-10 h-6 mt-2 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 300 40" className="absolute inset-0">
          {/* Neural network nodes */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={`input-${i}`}
              cx={30 + i * 60}
              cy={20}
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

          {/* Data flow paths */}
          {[...Array(4)].map((_, i) => (
            <path
              key={`path-${i}`}
              d={`M ${30 + i * 60} 20 L ${30 + (i + 1) * 60} 20`}
              stroke="#9333EA"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,2"
              className="data-flow-path"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

