"use client"

import { useRouter } from "next/navigation"
import { Calendar, Gift, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { TrackingAnimation } from "@/components/tracking-animation"
import { Input } from "@/components/ui/input"

export default function TrackingPage() {
  const router = useRouter()

  const handleViewActivity = () => {
    router.push("/activity")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full mb-4">
              <Gift className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Gift is on the Way!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're preparing your gift for Alex Johnson. You'll receive updates as it progresses.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Gift Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <TrackingAnimation status="processing" />

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Our gifting agents are preparing your Premium Coffee Set for shipment.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">March 20, 2025 at 6:45 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Estimated Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your gift is expected to arrive in 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Tracking Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive email notifications as your gift progresses through delivery stages.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Recipient Notification</h3>
                      <p className="text-sm text-muted-foreground">
                        Alex will receive an email when the gift is delivered with your personal message.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll follow up to see how your recipient enjoyed their gift.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expand Your Gifting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => router.push("/start")}
                  >
                    <Gift className="h-4 w-4" />
                    Send Another Gift
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => router.push("/campaigns")}
                  >
                    <Calendar className="h-4 w-4" />
                    Start a Gifting Campaign
                  </Button>

                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handleViewActivity}>
                    <Package className="h-4 w-4" />
                    View Activity Page
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">DelightLoop for Teams</h3>
                  <p className="text-sm text-blue-600 mb-3">
                    Scale your gifting with team accounts and advanced features.
                  </p>
                  <Button size="sm" className="w-full" onClick={() => router.push("/teams")}>
                    Book a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Refer a Friend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">
                    Know someone who would love DelightLoop? Invite them to try our AI-powered gifting platform.
                  </p>
                  <div className="flex gap-2">
                    <Input value="https://delightloop.com/r/YourReferralCode" readOnly className="flex-1" />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium mb-2">Get $10 credit for each referral</p>
                  <p className="text-sm text-muted-foreground">
                    Your friends get $10 too when they sign up and send their first gift
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

