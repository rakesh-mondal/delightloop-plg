"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Linkedin, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleLinkedInAuth = () => {
    setIsLoading(true)

    // Simulate LinkedIn authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/success")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M12 7v.01" />
                <path d="M16 11v.01" />
                <path d="M8 11v.01" />
              </svg>
              <span>DelightLoop</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to DelightLoop</h1>
          <p className="text-muted-foreground">Sign in to start sending personalized AI-powered gifts</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Button className="w-full gap-2 h-12 text-base" onClick={handleLinkedInAuth} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Linkedin className="h-5 w-5" />}
              {isLoading ? "Connecting to LinkedIn..." : "Sign in with LinkedIn"}
            </Button>

            <div className="flex items-center gap-2 my-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {showEmailForm ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Sign In with Email</Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full gap-2" onClick={() => setShowEmailForm(true)}>
                <Mail className="h-4 w-4" />
                Sign in with Email
              </Button>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          By signing in, you agree to our{" "}
          <a href="#" className="underline underline-offset-2 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

