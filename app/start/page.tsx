"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Linkedin, Search, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { ProgressBar } from "@/components/progress-bar"
import { RecipientCard } from "@/components/recipient-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dummy LinkedIn connections with real logo URLs
const LINKEDIN_CONNECTIONS = [
  {
    id: 1,
    name: "Sarah Williams",
    title: "Product Manager",
    company: "InnoTech Solutions",
    companyLogo: "https://logo.clearbit.com/microsoft.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    connectionLevel: "1st" as const,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Software Engineer",
    company: "CodeCraft Inc.",
    companyLogo: "https://logo.clearbit.com/google.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    connectionLevel: "1st" as const,
  },
  {
    id: 3,
    name: "Jessica Rodriguez",
    title: "Marketing Director",
    company: "BrandWave Media",
    companyLogo: "https://logo.clearbit.com/adobe.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    connectionLevel: "2nd" as const,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Sales Executive",
    company: "GrowthForce",
    companyLogo: "https://logo.clearbit.com/salesforce.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    connectionLevel: "3rd" as const,
  },
]

// Dummy search results for LinkedIn profiles with real logo URLs
const SEARCH_RESULTS = [
  {
    id: 5,
    name: "Alex Johnson",
    title: "Marketing Director",
    company: "TechCorp Inc.",
    companyLogo: "https://logo.clearbit.com/apple.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    connectionLevel: "2nd" as const,
  },
  {
    id: 6,
    name: "Alexandra Smith",
    title: "UX Designer",
    company: "DesignHub",
    companyLogo: "https://logo.clearbit.com/figma.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    connectionLevel: "3rd" as const,
  },
  {
    id: 7,
    name: "Alexander Brown",
    title: "Product Lead",
    company: "Innovate Labs",
    companyLogo: "https://logo.clearbit.com/atlassian.com", // Real logo URL
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    connectionLevel: "other" as const,
  },
]

export default function StartPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("connections")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState("")
  const [connectionSearchQuery, setConnectionSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Filter connections based on search query
  const filteredConnections = LINKEDIN_CONNECTIONS.filter(
    (connection) =>
      connection.name.toLowerCase().includes(connectionSearchQuery.toLowerCase()) ||
      connection.title.toLowerCase().includes(connectionSearchQuery.toLowerCase()) ||
      connection.company.toLowerCase().includes(connectionSearchQuery.toLowerCase()),
  )

  // Validate LinkedIn URL
  const validateLinkedinUrl = (url: string) => {
    const regex = /^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/
    return regex.test(url)
  }

  // Handle search input changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setSearchInput(input)
  }

  // Process search input when user submits
  const processSearchInput = () => {
    if (!searchInput.trim()) {
      setSearchResults([])
      setProfileData(null)
      return
    }

    // Check if input is a LinkedIn URL
    if (validateLinkedinUrl(searchInput)) {
      fetchProfileFromUrl(searchInput)
    } else {
      // If not a URL, treat as a name search
      searchProfiles(searchInput)
    }
  }

  // Fetch profile from URL
  const fetchProfileFromUrl = (url: string) => {
    setIsLoading(true)
    setSearchResults([])

    // Simulate API call to fetch LinkedIn profile data
    setTimeout(() => {
      setProfileData({
        id: 5,
        name: "Alex Johnson",
        title: "Marketing Director",
        company: "TechCorp Inc.",
        companyLogo: "https://logo.clearbit.com/apple.com", // Real logo URL
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        connectionLevel: "2nd" as const,
      })
      setIsLoading(false)
      setSelectedOption("search")
    }, 1000)
  }

  // Search profiles by name
  const searchProfiles = (query: string) => {
    if (!query) return

    setIsLoading(true)
    setProfileData(null)

    // Simulate API call to search LinkedIn profiles
    setTimeout(() => {
      // Filter search results based on the query
      const results = SEARCH_RESULTS.filter((profile) => profile.name.toLowerCase().includes(query.toLowerCase()))
      setSearchResults(results)
      setIsLoading(false)
    }, 800)
  }

  // Handle continue button click
  const handleContinue = () => {
    if (selectedOption === "self") {
      // For self option, use the user's own profile data
      const selfData = {
        name: "John Smith",
        title: "Marketing Manager",
        company: "Acme Corporation",
        companyLogo: "https://logo.clearbit.com/vercel.com", // Real logo URL
        image: "/placeholder.svg?height=100&width=100",
      }

      router.push(
        `/signal-processing?name=${encodeURIComponent(selfData.name)}&title=${encodeURIComponent(selfData.title)}&company=${encodeURIComponent(selfData.company)}&image=${encodeURIComponent(selfData.image)}&companyLogo=${encodeURIComponent(selfData.companyLogo)}`,
      )
    } else if (selectedOption === "search" && profileData) {
      // For search option, use the selected profile data
      router.push(
        `/signal-processing?name=${encodeURIComponent(profileData.name)}&title=${encodeURIComponent(profileData.title || "")}&company=${encodeURIComponent(profileData.company || "")}&image=${encodeURIComponent(profileData.imageUrl || "")}&companyLogo=${encodeURIComponent(profileData.companyLogo || "")}`,
      )
    } else if (selectedOption === "connections" && selectedContact !== null) {
      // For connections option, find the selected connection
      const selectedConnectionData = LINKEDIN_CONNECTIONS.find((conn) => conn.id === selectedContact)

      if (selectedConnectionData) {
        router.push(
          `/signal-processing?name=${encodeURIComponent(selectedConnectionData.name)}&title=${encodeURIComponent(selectedConnectionData.title || "")}&company=${encodeURIComponent(selectedConnectionData.company || "")}&image=${encodeURIComponent(selectedConnectionData.imageUrl || "")}&companyLogo=${encodeURIComponent(selectedConnectionData.companyLogo || "")}`,
        )
      }
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Select self option
  const selectSelfOption = () => {
    setSelectedOption("self")
    setSelectedContact(null)
    setProfileData(null)
  }

  // Select connection
  const selectConnection = (connectionId: number) => {
    setSelectedContact(connectionId)
    setSelectedOption("connections")
    setProfileData(null)
  }

  // Select profile from search results
  const selectProfile = (profile: any) => {
    setProfileData(profile)
    setSelectedOption("search")
    setSelectedContact(null)
  }

  // Effect to process search input when user presses Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && activeTab === "search") {
        processSearchInput()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeTab, searchInput])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Choose Gift Recipient</h1>
            <p className="text-muted-foreground">Select who you want to send a gift to</p>
            <div className="mt-6">
              <ProgressBar currentStep={1} totalSteps={3} />
            </div>
          </div>

          <div className="space-y-6">
            {/* Send to Yourself Option */}
            <Card
              className={`cursor-pointer transition-all ${selectedOption === "self" ? "ring-2 ring-primary" : "hover:shadow-md"}`}
              onClick={selectSelfOption}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Send to Yourself</h3>
                    <p className="text-sm text-muted-foreground">Try the experience by sending a gift to yourself</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Options */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-[#0077B5]/10 flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-[#0077B5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">LinkedIn Contact</h3>
                    <p className="text-sm text-muted-foreground">Send a gift to one of your LinkedIn connections</p>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="connections" className="flex-1">
                      My Connections
                    </TabsTrigger>
                    <TabsTrigger value="search" className="flex-1">
                      Find on LinkedIn
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="connections">
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search your connections..."
                          className="pl-9"
                          value={connectionSearchQuery}
                          onChange={(e) => setConnectionSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {filteredConnections.length > 0 ? (
                          filteredConnections.map((connection) => (
                            <RecipientCard
                              key={connection.id}
                              name={connection.name}
                              title={connection.title}
                              company={connection.company}
                              companyLogo={connection.companyLogo}
                              imageUrl={connection.imageUrl}
                              connectionLevel={connection.connectionLevel}
                              isSelected={selectedContact === connection.id}
                              onSelect={() => selectConnection(connection.id)}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No connections found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="search">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
                            <Search className="h-4 w-4" />
                          </div>
                          <Input
                            placeholder="Search by name or paste LinkedIn URL..."
                            className="pl-9"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                          />
                        </div>
                        <Button onClick={processSearchInput} disabled={!searchInput.trim() || isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Searching...
                            </>
                          ) : (
                            "Search"
                          )}
                        </Button>
                      </div>

                      <div className="text-xs text-foreground flex flex-wrap gap-2 items-center">
                        <span>Examples:</span>
                        <span className="bg-muted px-2 py-0.5 rounded">Alex Johnson</span>
                        <span>or</span>
                        <span className="bg-muted px-2 py-0.5 rounded truncate max-w-[200px]">
                          https://www.linkedin.com/in/alexjohnson
                        </span>
                      </div>

                      {isLoading && (
                        <div className="text-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                          <p className="text-muted-foreground">
                            {validateLinkedinUrl(searchInput)
                              ? "Fetching profile data..."
                              : "Searching LinkedIn profiles..."}
                          </p>
                        </div>
                      )}

                      {!isLoading && profileData && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Profile Found</h3>
                          <RecipientCard
                            name={profileData.name}
                            title={profileData.title}
                            company={profileData.company}
                            companyLogo={profileData.companyLogo}
                            imageUrl={profileData.imageUrl}
                            connectionLevel={profileData.connectionLevel}
                            isSelected={true}
                          />
                        </div>
                      )}

                      {!isLoading && !profileData && searchResults.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Search Results</h3>
                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                            {searchResults.map((profile) => (
                              <RecipientCard
                                key={profile.id}
                                name={profile.name}
                                title={profile.title}
                                company={profile.company}
                                companyLogo={profile.companyLogo}
                                imageUrl={profile.imageUrl}
                                connectionLevel={profile.connectionLevel}
                                isSelected={profileData?.id === profile.id}
                                onSelect={() => selectProfile(profile)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {!isLoading &&
                        searchInput &&
                        !profileData &&
                        searchResults.length === 0 &&
                        searchInput.trim() !== "" && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No profiles found matching "{searchInput}"</p>
                          </div>
                        )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={
                !selectedOption ||
                (selectedOption === "search" && !profileData) ||
                (selectedOption === "connections" && selectedContact === null)
              }
              className="gap-2"
            >
              Continue to Gift Selection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

