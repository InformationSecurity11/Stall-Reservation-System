"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Sparkles,
  User,
  LogOut,
  BookmarkPlus,
  LayoutDashboard,
  ChevronDown,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Reserve", path: "/reserve" },
    ...(isAuthenticated ? [{ name: "My Bookings", path: "/bookings" }] : []),
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative z-50"
          >
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              {/* Logo container */}
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-blue-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-xl lg:text-2xl text-foreground tracking-tight leading-none">
                BookFair<span className="text-primary">Hub</span>
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground font-medium tracking-wider uppercase">
                Colombo 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-5 py-2.5 rounded-xl font-medium text-sm xl:text-base transition-all duration-300 group",
                  isActiveRoute(link.path)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.name}
                
                {/* Active indicator */}
                {isActiveRoute(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                )}
                
                {/* Hover effect */}
                <span className="absolute inset-0 rounded-xl bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </Link>
            ))}

            {/* Event Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm xl:text-base text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-all duration-300"
                >
                  Event Info
                  <ChevronDown className="ml-1.5 w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 border-border/50 shadow-xl">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Event Details
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="px-3 py-3 rounded-lg cursor-pointer focus:bg-primary/5">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">March 15-21, 2026</span>
                    <span className="text-xs text-muted-foreground">7 Days Event</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-3 rounded-lg cursor-pointer focus:bg-primary/5">
                  <MapPin className="w-4 h-4 mr-3 text-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">BMICH, Colombo 7</span>
                    <span className="text-xs text-muted-foreground">Sri Lanka</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="px-3 py-3 rounded-lg cursor-pointer focus:bg-primary/5">
                  <Mail className="w-4 h-4 mr-3 text-olive" />
                  <span className="text-sm">info@bookfairhub.lk</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-3 rounded-lg cursor-pointer focus:bg-primary/5">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  <span className="text-sm">+94 11 234 5678</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Role Badge */}
                {user?.role && (
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 text-xs font-semibold border-primary/30 text-primary bg-primary/5 hidden xl:flex"
                  >
                    {user.role === "vendor" ? "Vendor" : "Customer"}
                  </Badge>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2.5 px-4 py-2.5 h-11 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="font-medium text-sm hidden xl:inline-block">
                        {user?.email?.split("@")[0] || "User"}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 border-border/50 shadow-xl">
                    <DropdownMenuLabel className="px-3 py-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.email?.split("@")[0]}</p>
                        <p className="text-xs text-muted-foreground leading-none">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      className="px-3 py-2.5 rounded-lg cursor-pointer focus:bg-primary/5"
                      onClick={() => navigate("/bookings")}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3 text-primary" />
                      <span className="font-medium">My Bookings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="px-3 py-2.5 rounded-lg cursor-pointer focus:bg-secondary/5"
                      onClick={() => navigate("/reserve")}
                    >
                      <BookmarkPlus className="w-4 h-4 mr-3 text-secondary" />
                      <span className="font-medium">Reserve Stall</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      className="px-3 py-2.5 rounded-lg cursor-pointer focus:bg-destructive/5 text-destructive focus:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                  className="px-5 py-2.5 h-11 font-medium hover:bg-primary/5 hover:text-primary transition-all duration-300"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/auth?tab=signup")}
                  className="px-6 py-2.5 h-11 font-medium bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden relative z-50 w-11 h-11 hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ top: "80px" }}
      >
        <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-2 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-6 py-4 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-between group",
                  isActiveRoute(link.path)
                    ? "bg-primary/10 text-primary border-2 border-primary/20"
                    : "hover:bg-primary/5 text-foreground/70 hover:text-foreground border-2 border-transparent"
                )}
              >
                {link.name}
                {isActiveRoute(link.path) && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                )}
              </Link>
            ))}

            {/* Mobile Event Info */}
            <div className="px-6 py-4 rounded-2xl border-2 border-border/50 bg-card/50 mt-4">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                Event Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">March 15-21, 2026</p>
                    <p className="text-xs text-muted-foreground">7 Days Event</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">BMICH, Colombo 7</p>
                    <p className="text-xs text-muted-foreground">Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-olive mt-0.5" />
                  <p className="text-sm">info@bookfairhub.lk</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-sm">+94 11 234 5678</p>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Auth Section */}
          <div className="space-y-4 pb-8">
            {isAuthenticated ? (
              <>
                <div className="px-6 py-4 rounded-2xl bg-blue-600/10 border-2 border-blue-600/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{user?.email?.split("@")[0]}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    {user?.role && (
                      <Badge variant="outline" className="px-2.5 py-1 text-xs font-semibold border-primary/30 text-primary bg-primary/5">
                        {user.role === "vendor" ? "Vendor" : "Customer"}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-14 text-base font-medium border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                  onClick={() => navigate("/bookings")}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 text-primary" />
                  My Bookings
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-14 text-base font-medium border-2 hover:bg-secondary/5 hover:border-secondary/50 transition-all duration-300"
                  onClick={() => navigate("/reserve")}
                >
                  <BookmarkPlus className="w-5 h-5 mr-3 text-secondary" />
                  Reserve Stall
                </Button>

                <Button
                  variant="destructive"
                  className="w-full h-14 text-base font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base font-medium border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
                <Button
                  className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300"
                  onClick={() => navigate("/auth?tab=signup")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
