"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  BookOpen,
  Calendar,
  Shield,
  Heart,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quickLinks: [
      { name: "Reserve a Stall", path: "/reserve", icon: BookOpen },
      { name: "My Bookings", path: "/bookings", icon: Calendar },
      { name: "Event Schedule", path: "/schedule", icon: Calendar },
      { name: "Contact Us", path: "/contact", icon: Mail },
    ],
    legal: [
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Refund Policy", path: "/refund" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
    resources: [
      { name: "FAQ", path: "/#faq" },
      { name: "Vendor Guide", path: "/vendor-guide" },
      { name: "Pricing", path: "/pricing" },
      { name: "Support Center", path: "/support" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-500" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-500" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-500" },
  ]

  const stats = [
    { value: "200+", label: "Vendors", icon: BookOpen },
    { value: "50K+", label: "Visitors", icon: Heart },
    { value: "7", label: "Days", icon: Calendar },
    { value: "100%", label: "Secure", icon: Shield },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-background via-card to-background border-t border-border/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-olive/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar */}
        <div className="py-12 lg:py-16 border-b border-border/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-olive rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-secondary to-olive p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-foreground tracking-tight leading-none">
                    BookFair<span className="text-primary">Hub</span>
                  </span>
                  <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                    Colombo 2026
                  </span>
                </div>
              </Link>

              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                Sri Lanka's premier book fair reservation platform. Connect vendors with readers, simplify bookings, and celebrate the joy of reading.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:info@bookfairhub.lk"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span>info@bookfairhub.lk</span>
                </a>
                <a
                  href="tel:+94112345678"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-secondary transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-secondary" />
                  </div>
                  <span>+94 11 234 5678</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground group">
                  <div className="w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center group-hover:bg-olive/20 transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-olive" />
                  </div>
                  <span className="leading-relaxed">
                    BMICH, Bauddhaloka Mawatha,<br />Colombo 07, Sri Lanka
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group",
                      social.color
                    )}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                Quick Links
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
                    >
                      <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                Resources
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-all duration-300 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                Stay Updated
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent"></div>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Subscribe to our newsletter for the latest updates, vendor tips, and exclusive early-bird offers.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-olive rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 rounded-xl border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary via-secondary to-olive hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 group"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {isSubscribed && (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary animate-fade-in flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
                  </div>
                )}
              </form>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="outline" className="px-3 py-1.5 border-primary/30 text-primary bg-primary/5 font-medium">
                  <Shield className="w-3 h-3 mr-1.5" />
                  Secure Payments
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 border-secondary/30 text-secondary bg-secondary/5 font-medium">
                  <Heart className="w-3 h-3 mr-1.5" />
                  24/7 Support
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 border-olive/30 text-olive bg-olive/5 font-medium">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  Easy Booking
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="py-8 border-t border-border/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {footerLinks.legal.map((link, index) => (
                <span key={link.path} className="flex items-center gap-2">
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-border">•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center lg:text-right">
              <p className="flex items-center gap-2 justify-center lg:justify-end">
                © {currentYear} BookFairHub. Made with
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                in Sri Lanka
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-olive rounded-full"></div>
      </div>
    </footer>
  )
}
