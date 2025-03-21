"use client"

import { User, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface RecipientCardProps {
  name: string
  title?: string
  company?: string
  companyLogo?: string
  imageUrl?: string
  connectionLevel?: "1st" | "2nd" | "3rd" | "other" | null
  isSelected?: boolean
  onSelect?: () => void
}

export function RecipientCard({
  name,
  title,
  company,
  companyLogo,
  imageUrl,
  connectionLevel,
  isSelected = false,
  onSelect,
}: RecipientCardProps) {
  const [logoError, setLogoError] = useState(false)

  return (
    <div
      className={cn(
        "flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border cursor-pointer transition-all",
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border hover:border-primary/50 hover:bg-muted/50",
      )}
      onClick={onSelect}
    >
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium truncate">{name}</h3>
          {connectionLevel && (
            <span className={`connection-badge connection-${connectionLevel} rounded-full px-2`}>
              {connectionLevel === "other" ? "3+" : connectionLevel}
            </span>
          )}
        </div>
        {(title || company) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
            {title && <span className="truncate">{title}</span>}
            {company && title && <span className="mx-1">at</span>}
            {company && (
              <div className="flex items-center gap-1.5 truncate">
                {companyLogo && !logoError ? (
                  <div className="h-4 w-4 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={companyLogo || "/placeholder.svg"}
                      alt={company}
                      className="h-full w-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <Building className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="truncate">{company}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {isSelected && (
        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      )}
    </div>
  )
}

