"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  Package,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react"

// Mock booking data
interface Booking {
  id: string
  stallId: string
  stallName: string
  location: string
  startDate: string
  endDate: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  price: number
  qrCode?: string
  bookingDate: string
}

const mockBookings: Booking[] = [
  {
    id: "BK-001",
    stallId: "A-001",
    stallName: "Stall A-001",
    location: "Hall A - Entrance Corner",
    startDate: "2026-03-15",
    endDate: "2026-03-21",
    status: "confirmed",
    price: 10000,
    bookingDate: "2025-11-01",
    qrCode: "QR-123456",
  },
  {
    id: "BK-002",
    stallId: "B-003",
    stallName: "Stall B-003",
    location: "Hall B - Side Corner",
    startDate: "2026-03-15",
    endDate: "2026-03-21",
    status: "confirmed",
    price: 7500,
    bookingDate: "2025-11-03",
    qrCode: "QR-789012",
  },
  {
    id: "BK-003",
    stallId: "O-001",
    stallName: "Stall O-001",
    location: "Outdoor - Garden Area",
    startDate: "2026-03-15",
    endDate: "2026-03-21",
    status: "pending",
    price: 8500,
    bookingDate: "2025-11-10",
  },
  {
    id: "BK-004",
    stallId: "A-005",
    stallName: "Stall A-005",
    location: "Hall A - Side Wing",
    startDate: "2025-09-10",
    endDate: "2025-09-16",
    status: "completed",
    price: 5000,
    bookingDate: "2025-08-15",
    qrCode: "QR-345678",
  },
  {
    id: "BK-005",
    stallId: "B-002",
    stallName: "Stall B-002",
    location: "Hall B - Center Section",
    startDate: "2025-10-01",
    endDate: "2025-10-07",
    status: "cancelled",
    price: 5000,
    bookingDate: "2025-09-20",
  },
]

export default function Booking() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const navigate = useNavigate()

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesTab =
      activeTab === "active"
        ? booking.status === "confirmed" || booking.status === "pending"
        : booking.status === "completed" || booking.status === "cancelled"

    const matchesSearch =
      booking.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      selectedStatus === "All" || booking.status === selectedStatus.toLowerCase()

    return matchesTab && matchesSearch && matchesStatus
  })

  const stats = {
    total: mockBookings.length,
    active: mockBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
      .length,
    completed: mockBookings.filter((b) => b.status === "completed").length,
    totalSpent: mockBookings
      .filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + b.price, 0),
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          bg: "bg-[rgba(16,185,129,0.08)]",
          text: "text-[rgb(16,185,129)]",
          border: "border-[rgba(16,185,129,0.18)]",
          icon: CheckCircle2,
        }
      case "pending":
        return {
          bg: "bg-[rgba(245,158,11,0.08)]",
          text: "text-[rgb(245,158,11)]",
          border: "border-[rgba(245,158,11,0.18)]",
          icon: Clock,
        }
      case "cancelled":
        return {
          bg: "bg-[rgba(239,68,68,0.08)]",
          text: "text-[rgb(239,68,68)]",
          border: "border-[rgba(239,68,68,0.18)]",
          icon: XCircle,
        }
      case "completed":
        return {
          bg: "bg-[rgba(124,58,237,0.08)]",
          text: "text-[rgb(124,58,237)]",
          border: "border-[rgba(124,58,237,0.18)]",
          icon: CheckCircle2,
        }
      default:
        return {
          bg: "bg-muted",
          text: "text-muted-foreground",
          border: "border-border",
          icon: AlertCircle,
        }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(135deg,rgba(124,58,237,0.04),rgba(16,185,129,0.03),rgba(236,72,153,0.04))]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)]"
            >
              <Package className="w-4 h-4 mr-2" />
              My Bookings
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[rgb(124,58,237)] to-[rgb(236,72,153)]">
              Manage Your Stall Bookings
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Track your reservations, download QR codes, and manage all your bookings in one
              place.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="p-4 border-2 border-[rgba(124,58,237,0.06)] hover:border-[rgba(124,58,237,0.18)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.08)] flex items-center justify-center">
                    <Package className="w-6 h-6 text-[rgb(124,58,237)]" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-[rgba(16,185,129,0.06)] hover:border-[rgba(16,185,129,0.18)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[rgb(16,185,129)]" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-[rgba(236,72,153,0.06)] hover:border-[rgba(236,72,153,0.18)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(236,72,153,0.08)] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[rgb(236,72,153)]" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-[rgba(124,58,237,0.06)] hover:border-[rgba(124,58,237,0.18)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.08)] flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[rgb(124,58,237)]" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">
                      ${stats.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs and Search */}
          <div className="mb-8 space-y-4">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={activeTab === "active" ? "default" : "outline"}
                onClick={() => setActiveTab("active")}
                className={`px-8 h-12 ${
                  activeTab === "active"
                    ? "bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(16,185,129)] text-white shadow-lg"
                    : ""
                }`}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Active Bookings
              </Button>
              <Button
                variant={activeTab === "past" ? "default" : "outline"}
                onClick={() => setActiveTab("past")}
                className={`px-8 h-12 ${
                  activeTab === "past"
                    ? "bg-gradient-to-r from-[rgb(236,72,153)] to-[rgb(124,58,237)] text-white shadow-lg"
                    : ""
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                Past Bookings
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search by booking ID, stall name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 gap-2 bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <Button
                variant="ghost"
                className="h-12 gap-2 bg-gradient-to-r from-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white shadow-sm hover:shadow-lg transition-shadow duration-200"
                onClick={() => navigate("/reserve")}
              >
                <Sparkles className="w-5 h-5" />
                New Booking
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <Card className="p-6 border-2 animate-fade-in bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((status) => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className={
                          selectedStatus === status
                            ? "bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(16,185,129)] text-white"
                            : ""
                        }
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Bookings Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {activeTab === "active" ? "Active" : "Past"} Bookings
                <span className="ml-3 text-base font-normal text-muted-foreground">
                  ({filteredBookings.length} found)
                </span>
              </h2>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBookings.map((booking) => {
                  const statusStyle = getStatusStyles(booking.status)
                  const StatusIcon = statusStyle.icon

                  return (
                    <Card
                      key={booking.id}
                      className="p-6 border-2 border-[rgba(124,58,237,0.06)] hover:border-[rgba(124,58,237,0.18)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)]">
                              {booking.stallName}
                            </h3>
                            <Badge
                              className={`${statusStyle.bg} ${statusStyle.text} border-2 ${statusStyle.border}`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Booking ID:</span>
                          <span className="font-semibold text-foreground">{booking.id}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Event Dates:
                          </span>
                          <span className="font-semibold text-foreground">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Booked On:</span>
                          <span className="font-semibold text-foreground">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground">Total Price</span>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(16,185,129)] to-[rgb(236,72,153)]">
                              ${booking.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => console.log("View details:", booking.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {booking.qrCode && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(16,185,129)] text-white"
                            onClick={() => console.log("Download QR:", booking.qrCode)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            QR Code
                          </Button>
                        )}
                        {booking.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                            onClick={() => console.log("Cancel:", booking.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="p-12 text-center border-2 border-dashed bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-bold mb-2">No Bookings Found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "active"
                    ? "You don't have any active bookings yet."
                    : "You don't have any past bookings."}
                </p>
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white"
                  onClick={() => navigate("/reserve")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Make a New Booking
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
