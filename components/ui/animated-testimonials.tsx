"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
  onSelect,
  selectedIndex,
  showSelectButton = true,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
  onSelect?: (index: number) => void
  selectedIndex?: number
  showSelectButton?: boolean
}) => {
  const [active, setActive] = useState(selectedIndex || 0)

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setActive(selectedIndex)
    }
  }, [selectedIndex])

  const handleNext = () => {
    const newActive = (active + 1) % testimonials.length
    setActive(newActive)
    if (onSelect) onSelect(newActive)
  }

  const handlePrev = () => {
    const newActive = (active - 1 + testimonials.length) % testimonials.length
    setActive(newActive)
    if (onSelect) onSelect(newActive)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <div className="relative h-64 md:h-80 w-full max-w-sm">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom cursor-pointer"
                  onClick={() => {
                    setActive(index)
                    if (onSelect) onSelect(index)
                  }}
                >
                  <img
                    src={testimonial.src || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-full w-full rounded-xl object-cover object-center shadow-md"
                  />
                  {isActive(index) && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-2">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl font-bold text-foreground">{testimonials[active].name}</h3>
            <p className="text-sm text-muted-foreground">{testimonials[active].designation}</p>
            <motion.p className="text-base text-muted-foreground mt-4">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-6 md:pt-0 justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <ArrowLeft className="h-4 w-4 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <ArrowRight className="h-4 w-4 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
            {showSelectButton && (
              <button
                onClick={() => {
                  if (onSelect) onSelect(active)
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
              >
                Select This Gift
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

