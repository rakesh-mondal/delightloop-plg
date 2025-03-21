"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Check, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthSuccessPage() {
  const router = useRouter()

  // Simulated user data from LinkedIn
  const userData = {
    name: "John Smith",
    title: "Marketing Manager",
    company: "Acme Corporation",
    email: "john.smith@acme.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full mb-4">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Successfully Connected</h1>
          <p className="text-muted-foreground">Your LinkedIn profile has been connected to DelightLoop</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>We've imported these details from LinkedIn</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {userData.imageUrl ? (
                  <img
                    src={userData.imageUrl || "/placeholder.svg"}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-muted-foreground">
                  {userData.title} at {userData.company}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{userData.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Profile information imported</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Account created successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm">Ready to start gifting</span>
              </div>
            </div>

            <Button className="w-full mt-6 gap-2" onClick={() => router.push("/start")}>
              Start Gifting Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

