"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Calendar, Gift, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function CampaignsPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gifting Campaigns</h1>
          <p className="text-muted-foreground">Create and manage gifting campaigns for multiple recipients</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Client Appreciation</CardTitle>
              <CardDescription>Thank your clients with personalized gifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Multiple recipients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">AI-selected gifts</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Show appreciation to your clients with personalized gifts selected by our AI based on their profiles.
                </p>

                <Button className="w-full" onClick={() => router.push("/campaigns/client-appreciation")}>
                  Start Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Follow-up</CardTitle>
              <CardDescription>Thank attendees after your event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Post-event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Themed gifts</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Follow up with event attendees by sending themed gifts that reinforce your event's message.
                </p>

                <Button className="w-full" onClick={() => router.push("/campaigns/event-followup")}>
                  Start Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employee Recognition</CardTitle>
              <CardDescription>Recognize and reward your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Team members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Personalized gifts</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Boost morale and show appreciation to your team members with personalized gifts.
                </p>

                <Button className="w-full" onClick={() => router.push("/campaigns/employee-recognition")}>
                  Start Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Campaign</CardTitle>
            <CardDescription>Create a fully customized gifting campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Design your own gifting campaign from scratch. Choose recipients, select gifts, set budgets, and schedule
              delivery dates.
            </p>
            <Button onClick={() => router.push("/campaigns/custom")} className="gap-2">
              Create Custom Campaign
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

