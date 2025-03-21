"use client"

import { Check, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GiftCardProps {
  title: string
  description: string
  price: string
  imageUrl: string
  isSelected?: boolean
  onSelect?: () => void
}

export function GiftCard({ title, description, price, imageUrl, isSelected = false, onSelect }: GiftCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        isSelected ? "ring-2 ring-primary" : "hover:shadow-md",
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
      <div className="aspect-video w-full overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium">{price}</span>
          <Button variant={isSelected ? "default" : "outline"} size="sm" onClick={onSelect}>
            <Gift className="h-4 w-4 mr-2" />
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

