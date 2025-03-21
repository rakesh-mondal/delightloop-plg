"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Linkedin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { RecipientCard } from "@/components/recipient-card"

export default function LinkedInPage() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)

    // Simulate API call to fetch LinkedIn profile data
    setTimeout(() => {
      setProfileData({
        name: "Alex Johnson",
        title: "Marketing Director",
        company: "TechCorp Inc.",
        imageUrl: "/placeholder.svg?height=200&width=200",
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleContinue = () => {
    router.push("/gift-selection")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">LinkedIn Recipient</h1>
          <p className="text-muted-foreground">Enter your recipient's LinkedIn profile URL</p>
          <div className="mt-6">
            <ProgressBar currentStep={1} totalSteps={4} />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin-url"
                    placeholder="https://www.linkedin.com/in/username"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !url}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : (
                      "Fetch Profile"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Example: https://www.linkedin.com/in/johndoe</p>
              </div>
            </form>

            {isLoading && (
              <div className="mt-8 flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Fetching profile data...</p>
              </div>
            )}

            {profileData && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Profile Found</h3>
                <RecipientCard
                  name={profileData.name}
                  title={profileData.title}
                  company={profileData.company}
                  imageUrl={profileData.imageUrl}
                  isSelected={true}
                />

                <div className="mt-6 flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                  <Linkedin className="h-5 w-5 text-[#0077B5]" />
                  <p className="text-sm">
                    <span className="font-medium">LinkedIn Profile:</span> Our AI will analyze this profile to recommend
                    the perfect gift.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleContinue} disabled={!profileData} className="gap-2">
            Continue to Gift Selection
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

