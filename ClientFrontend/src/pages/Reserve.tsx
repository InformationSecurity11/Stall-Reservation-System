"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import StallCard, { type Stall } from "@/components/StallCard"
import BookingSummary from "@/components/BookingSummary"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Filter,
  Search,
  MapPin,
  Grid3x3,
  List,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data for stalls
const mockStalls: Stall[] = [
  {
    id: "A-001",
    name: "Stall A-001",
    location: "Hall A - Entrance Corner",
    hall: "Hall A",
    type: "Premium",
    price: 10000,
    size: "4m × 4m",
    amenities: ["Wi-Fi", "Power", "High Traffic"],
    available: true,
    isPopular: true,
    image: "/placeholder-stall.jpg",
  },
  {
    id: "A-002",
    name: "Stall A-002",
    location: "Hall A - Center Row 1",
    hall: "Hall A",
    type: "Standard",
    price: 5000,
    size: "3m × 3m",
    amenities: ["Wi-Fi", "Power"],
    available: true,
  },
  {
    id: "A-003",
    name: "Stall A-003",
    location: "Hall A - Corner Row 2",
    hall: "Hall A",
    type: "Corner",
    price: 7500,
    size: "3.5m × 3.5m",
    amenities: ["Wi-Fi", "Power", "High Traffic"],
    available: true,
    isPopular: true,
  },
  {
    id: "B-001",
    name: "Stall B-001",
    location: "Hall B - Main Entrance",
    hall: "Hall B",
    type: "Premium",
    price: 10000,
    size: "4m × 4m",
    amenities: ["Wi-Fi", "Power", "High Traffic"],
    available: true,
  },
  {
    id: "B-002",
    name: "Stall B-002",
    location: "Hall B - Center Section",
    hall: "Hall B",
    type: "Standard",
    price: 5000,
    size: "3m × 3m",
    amenities: ["Wi-Fi", "Power"],
    available: false,
  },
  {
    id: "B-003",
    name: "Stall B-003",
    location: "Hall B - Side Corner",
    hall: "Hall B",
    type: "Corner",
    price: 7500,
    size: "3.5m × 3.5m",
    amenities: ["Wi-Fi", "Power"],
    available: true,
  },
  {
    id: "O-001",
    name: "Stall O-001",
    location: "Outdoor - Garden Area",
    hall: "Outdoor",
    type: "Premium",
    price: 8500,
    size: "4m × 4m",
    amenities: ["Power", "High Traffic"],
    available: true,
    isPopular: true,
  },
  {
    id: "O-002",
    name: "Stall O-002",
    location: "Outdoor - Pavilion",
    hall: "Outdoor",
    type: "Standard",
    price: 4500,
    size: "3m × 3m",
    amenities: ["Power"],
    available: true,
  },
  {
    id: "A-004",
    name: "Stall A-004",
    location: "Hall A - Back Row",
    hall: "Hall A",
    type: "Standard",
    price: 5000,
    size: "3m × 3m",
    amenities: ["Wi-Fi", "Power"],
    available: true,
  },
  {
    id: "B-004",
    name: "Stall B-004",
    location: "Hall B - Corner Position",
    hall: "Hall B",
    type: "Corner",
    price: 7500,
    size: "3.5m × 3.5m",
    amenities: ["Wi-Fi", "Power", "High Traffic"],
    available: true,
  },
  {
    id: "O-003",
    name: "Stall O-003",
    location: "Outdoor - Front Row",
    hall: "Outdoor",
    type: "Corner",
    price: 7000,
    size: "3.5m × 3.5m",
    amenities: ["Power", "High Traffic"],
    available: true,
  },
  {
    id: "A-005",
    name: "Stall A-005",
    location: "Hall A - Side Wing",
    hall: "Hall A",
    type: "Standard",
    price: 5000,
    size: "3m × 3m",
    amenities: ["Wi-Fi", "Power"],
    available: false,
  },
]

export default function Reserve() {
  const [selectedStalls, setSelectedStalls] = useState<Stall[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHall, setSelectedHall] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  const maxStalls = 3

  const handleSelectStall = (stallId: string) => {
    const stall = mockStalls.find((s) => s.id === stallId)
    if (!stall) return

    const isSelected = selectedStalls.some((s) => s.id === stallId)

    if (isSelected) {
      setSelectedStalls(selectedStalls.filter((s) => s.id !== stallId))
    } else {
      if (selectedStalls.length < maxStalls) {
        setSelectedStalls([...selectedStalls, stall])
      }
    }
  }

  const handleRemoveStall = (stallId: string) => {
    setSelectedStalls(selectedStalls.filter((s) => s.id !== stallId))
  }

  const handleContinue = () => {
    // TODO: Navigate to booking details page
    console.log("Continue with:", { selectedStalls, selectedDate })
    navigate("/bookings")
  }

  // Filter stalls
  const filteredStalls = mockStalls.filter((stall) => {
    const matchesSearch =
      stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stall.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesHall = selectedHall === "All" || stall.hall === selectedHall
    const matchesType = selectedType === "All" || stall.type === selectedType
    return matchesSearch && matchesHall && matchesType
  })

  const stats = {
    total: mockStalls.length,
    available: mockStalls.filter((s) => s.available).length,
    premium: mockStalls.filter((s) => s.type === "Premium" && s.available).length,
    popular: mockStalls.filter((s) => s.isPopular).length,
  }

  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold text-blue-700 border-blue-200 bg-blue-50">
              <Sparkles className="w-4 h-4 mr-2" />
              Colombo BookFair 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Reserve Your Perfect Stall
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose from {stats.available} available premium locations across Hall A, Hall B, and
              Outdoor venues. Select up to {maxStalls} stalls for your book fair experience.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Grid3x3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Stalls</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.available}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.premium}</p>
                    <p className="text-xs text-muted-foreground">Premium</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.popular}</p>
                    <p className="text-xs text-muted-foreground">Popular</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Search and Filters */}
            <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search by stall name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              {/* Date Picker Placeholder */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={selectedDate?.toISOString().split("T")[0] || ""}
                  onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  className="pl-12 h-12 md:w-64"
                  placeholder="Select date"
                />
              </div>

              {/* Filter Button */}
              <Button
                variant="gradient"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 gap-2 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-12 w-12"
                >
                  <Grid3x3 className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-12 w-12"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="p-6 animate-fade-in bg-white rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hall Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Hall</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Hall A", "Hall B", "Outdoor"].map((hall) => (
                        <Button
                          key={hall}
                          variant={selectedHall === hall ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedHall(hall)}
                        >
                          {hall}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Standard", "Corner", "Premium"].map((type) => (
                        <Button
                          key={type}
                          variant={selectedType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stalls Grid/List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Available Stalls
                  <span className="ml-3 text-base font-normal text-muted-foreground">
                    ({filteredStalls.length} found)
                  </span>
                </h2>
              </div>

              {filteredStalls.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredStalls.map((stall) => (
                    <StallCard
                      key={stall.id}
                      stall={stall}
                      isSelected={selectedStalls.some((s) => s.id === stall.id)}
                      onSelect={handleSelectStall}
                      disabled={
                        !selectedStalls.some((s) => s.id === stall.id) &&
                        selectedStalls.length >= maxStalls
                      }
                    />
                  ))}
                </div>
              ) : (
        <Card className="p-12 text-center border-2 border-dashed bg-gray-50">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-bold mb-2">No Stalls Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedHall("All")
                      setSelectedType("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>

            {/* Booking Summary - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <BookingSummary
                selectedStalls={selectedStalls}
                selectedDate={selectedDate}
                onRemoveStall={handleRemoveStall}
                onContinue={handleContinue}
                maxStalls={maxStalls}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
