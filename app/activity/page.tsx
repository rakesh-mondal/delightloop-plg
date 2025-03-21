"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Gift, Package, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"

const GIFT_HISTORY = [
  {
    id: 1,
    recipient: "Alex Johnson",
    gift: "Premium Coffee Set",
    date: "March 20, 2025",
    status: "Processing",
    imageUrl: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    recipient: "Sarah Williams",
    gift: "Business Book Bundle",
    date: "March 15, 2025",
    status: "Delivered",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    recipient: "Michael Chen",
    gift: "Tech Gadget Kit",
    date: "March 10, 2025",
    status: "Shipped",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function ActivityPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGifts = GIFT_HISTORY.filter(
    (gift) =>
      gift.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.gift.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gift Activity</h1>
          <p className="text-muted-foreground">Track and manage all your sent and received gifts</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gifts or recipients..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => router.push("/start")} className="gap-2">
            <Gift className="h-4 w-4" />
            Send New Gift
          </Button>
        </div>

        <Tabs defaultValue="sent">
          <TabsList className="mb-6">
            <TabsTrigger value="sent">Sent Gifts</TabsTrigger>
            <TabsTrigger value="received">Received Gifts</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="sent">
            <div className="space-y-6">
              {filteredGifts.map((gift) => (
                <Card key={gift.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-32 h-32 bg-muted">
                      <img
                        src={gift.imageUrl || "/placeholder.svg"}
                        alt={gift.gift}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {gift.recipient}
                          </h3>
                          <p className="text-lg font-medium mt-1">{gift.gift}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {gift.date}
                            </span>
                            <span
                              className={`text-sm px-2 py-0.5 rounded-full ${
                                gift.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : gift.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {gift.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => router.push("/tracking")}>
                            Track Gift
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => {}}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}

              {filteredGifts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No gifts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? `No gifts matching "${searchQuery}"` : "You haven't sent any gifts yet"}
                  </p>
                  {!searchQuery && (
                    <Button className="mt-4" onClick={() => router.push("/start")}>
                      Send Your First Gift
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="received">
            <div className="text-center py-12">
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No gifts received yet</h3>
              <p className="text-muted-foreground">Gifts you receive will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Start a Gifting Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Send gifts to multiple recipients with our campaign feature. Perfect for client appreciation, employee
                  recognition, or event follow-ups.
                </p>
                <Button onClick={() => router.push("/campaigns")}>Create Campaign</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

