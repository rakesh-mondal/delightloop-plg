"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Mail, MessageSquare, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from a context or state management solution
const selectedGift = {
  name: "Premium Coffee Set",
  description: "Artisanal coffee beans with brewing equipment",
  price: "$75.00",
  imageUrl: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070&auto=format&fit=crop",
}

export default function RecipientDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "alex.johnson@techcorp.com",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    router.push("/tracking")
  }

  const isFormComplete = () => {
    return formData.email ? true : false
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Gift</h1>
            <p className="text-muted-foreground">Add shipping details and a personal message</p>
            <div className="mt-6">
              <ProgressBar currentStep={3} totalSteps={3} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
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
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <Tabs defaultValue="shipping">
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="shipping" className="flex-1">
                      Shipping Details
                    </TabsTrigger>
                    <TabsTrigger value="message" className="flex-1">
                      Personal Message
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="shipping">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          Contact Information
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="recipient@example.com"
                            />
                            <p className="text-xs text-muted-foreground">
                              We'll send a notification email when the gift is on its way
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          Shipping Address
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="123 Main St"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              placeholder="ZIP Code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="message">
                    <div>
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
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleContinue} disabled={!isFormComplete()} className="gap-2">
              <Gift className="h-4 w-4 mr-1" />
              Send Gift Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

