"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Gift } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { AnimatedAIInsights } from "@/components/animated-ai-insights"

const GIFT_OPTIONS = [
  {
    id: 1,
    name: "Premium Coffee Set",
    designation: "$75 - Artisanal coffee beans with brewing equipment",
    quote:
      "This premium coffee set includes specialty beans from around the world, a high-quality grinder, and brewing equipment. Perfect for coffee enthusiasts who appreciate the art of brewing. The set comes with a guide to different brewing methods and flavor profiles.",
    src: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070&auto=format&fit=crop",
    aiMatch: 98,
  },
  {
    id: 2,
    name: "Business Book Bundle",
    designation: "$65 - Three bestselling business strategy books",
    quote:
      "This curated collection features three bestselling business books on leadership, innovation, and strategic thinking. Each book offers valuable insights for professionals looking to enhance their business acumen and stay ahead of industry trends.",
    src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
    aiMatch: 92,
  },
  {
    id: 3,
    name: "Tech Gadget Kit",
    designation: "$85 - Essential tech accessories for professionals",
    quote:
      "This tech gadget kit includes a multi-port USB hub, wireless earbuds, and a smart portable charger. These essential accessories are designed for professionals who are always on the go and need reliable tech solutions to stay connected and productive.",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    aiMatch: 87,
  },
]

// AI insights about the recipient
const AI_INSIGHTS = [
  "Alex is a Marketing Director at TechCorp Inc. with interests in technology, business strategy, and coffee. These gifts align with their professional interests and personal preferences.",
  "Based on LinkedIn activity, Alex shows high engagement with content related to marketing technology and business innovation.",
  "Alex's network connections suggest a preference for premium professional products that enhance productivity and work-life balance.",
]

export default function GiftSelectionPage() {
  const router = useRouter()
  const [selectedGift, setSelectedGift] = useState<number>(0)

  const handleContinue = () => {
    router.push("/recipient-details")
  }

  const testimonials = GIFT_OPTIONS.map((gift) => ({
    name: gift.name,
    designation: gift.designation,
    quote: gift.quote,
    src: gift.src,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI-Recommended Gifts</h1>
            <p className="text-muted-foreground">
              Based on Alex Johnson's LinkedIn profile, our AI has selected these gifts
            </p>
            <div className="mt-6">
              <ProgressBar currentStep={2} totalSteps={3} />
            </div>
          </div>

          <AnimatedAIInsights
            recipientName="Alex Johnson"
            recipientTitle="Marketing Director"
            recipientCompany="TechCorp Inc."
            insights={AI_INSIGHTS}
            className="mb-8"
          />

          <AnimatedTestimonials
            testimonials={testimonials}
            onSelect={(index) => setSelectedGift(index)}
            selectedIndex={selectedGift}
            className="mb-8"
            showSelectButton={false}
          />

          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <span className="font-medium flex items-center">
                AI Match Score:
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedGift}
                    className="ml-1 text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.2 },
                      }}
                    >
                      <CountUp from={0} to={GIFT_OPTIONS[selectedGift].aiMatch} duration={1.5} />%
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </span>
            </div>
            <Button onClick={handleContinue} className="gap-2">
              Continue with Selected Gift
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

// CountUp component for animating numbers
function CountUp({ from, to, duration = 1 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    // Reset to start value when target changes
    setCount(from)

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(from + progress * (to - from)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <>{count}</>
}

