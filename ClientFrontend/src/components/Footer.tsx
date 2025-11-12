import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Sparkles,
  Send,
  Shield,
  Clock,
  CheckCircle2,
  Users,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const stats = [
    { icon: Users, label: "200+ Vendors", value: "200+" },
    { icon: CheckCircle2, label: "50K+ Visitors", value: "50K+" },
    { icon: Clock, label: "7 Days Event", value: "7" },
    { icon: Shield, label: "100% Secure", value: "100%" },
  ]

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Reserve Stall", path: "/reserve" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Event Info", path: "/event-info" },
  ]

  const resources = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund" },
    { name: "Contact Us", path: "/contact" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="relative bg-muted/30 border-t border-border overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      {/* Stats Bar */}
      <div className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-background to-muted/30 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-olive flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  BookFair
                </h3>
                <p className="text-xs text-muted-foreground">Reservation System</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sri Lanka's premier book fair reservation platform. Secure your exhibition space
              with confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@bookfair.lk">info@bookfair.lk</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:+94112345678">+94 11 234 5678</a>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1" />
                <span>BMICH, Colombo 07,<br />Sri Lanka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 border-2 border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground">Resources</h4>
            <nav className="space-y-3">
              {resources.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get event updates and exclusive offers.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button size="icon" variant="gradient">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  No Spam
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} BookFair Reservation System. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/refund"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Refund
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Border Bottom */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-olive" />
    </footer>
  )
}
