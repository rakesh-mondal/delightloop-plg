"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Gift, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"

// This would typically come from a context or state management solution
const selectedGift = {
  name: "Premium Coffee Set",
  description: "Artisanal coffee beans with brewing equipment",
  price: "$75.00",
  imageUrl: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070&auto=format&fit=crop",
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSendGift = () => {
    router.push("/tracking")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Confirm Your Gift</h1>
            <p className="text-muted-foreground">Review your gift selection and add a personal message</p>
            <div className="mt-6">
              <ProgressBar currentStep={4} totalSteps={4} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Gift Summary
                </h3>

                <div className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <img
                      src={selectedGift.imageUrl || "/placeholder.svg"}
                      alt={selectedGift.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium">{selectedGift.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedGift.description}</p>
                    <p className="mt-2 font-medium">{selectedGift.price}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recipient</h4>
                    <p className="text-sm">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">Marketing Director at TechCorp Inc.</p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm">123 Main St</p>
                    <p className="text-sm">City, State ZIP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Personal Message
                </h3>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Add a personal message to accompany your gift..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px]"
                  />

                  <p className="text-xs text-muted-foreground">
                    Your message will be included on a personalized card with the gift.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Preview</h4>
                    <div className="bg-white p-4 rounded border">
                      <p className="text-sm italic">{message || "Your message will appear here..."}</p>
                      <p className="text-sm mt-4">
                        Best regards,
                        <br />
                        John Smith
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSendGift} className="gap-2">
              <Send className="h-4 w-4" />
              Send Gift Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

