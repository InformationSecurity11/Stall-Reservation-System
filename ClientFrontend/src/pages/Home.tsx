import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-olive/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Colombo BookFair 2026 - March 15-21
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Reserve Your Perfect
              <br />
              BookFair Stall
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Secure premium exhibition space at Sri Lanka's premier book fair. Choose from
              indoor halls and outdoor pavilions with state-of-the-art amenities.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                size="lg"
                variant="gradient"
                className="h-14 px-8 text-lg gap-2"
                onClick={() => navigate("/reserve")}
              >
                Browse Available Stalls
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                View Event Info
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: MapPin, label: "100+ Stalls", color: "primary" },
                { icon: Users, label: "50K+ Visitors", color: "secondary" },
                { icon: Calendar, label: "7 Days Event", color: "olive" },
                { icon: Shield, label: "100% Secure", color: "primary" },
              ].map((stat, idx) => (
                <Card
                  key={idx}
                  className="p-4 border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 text-${stat.color}`} />
                  <p className="font-semibold text-sm">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reserve your stall in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  icon: MapPin,
                  title: "Choose Your Stall",
                  description:
                    "Browse available stalls across Hall A, Hall B, and Outdoor pavilions. Filter by location, size, and amenities.",
                },
                {
                  step: "02",
                  icon: Calendar,
                  title: "Select Dates",
                  description:
                    "Pick your reservation dates and confirm availability. Book up to 3 stalls for the entire 7-day event.",
                },
                {
                  step: "03",
                  icon: CheckCircle2,
                  title: "Confirm & Pay",
                  description:
                    "Complete your booking with secure payment. Receive instant QR code confirmation via email.",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="relative p-8 border-2 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Premium facilities and services for your success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Fast Booking",
                  description: "Reserve in minutes with our streamlined process",
                  gradient: "from-primary to-secondary",
                },
                {
                  icon: Shield,
                  title: "Secure Payment",
                  description: "Bank-grade encryption for all transactions",
                  gradient: "from-secondary to-olive",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance for your queries",
                  gradient: "from-olive to-primary",
                },
                {
                  icon: CheckCircle2,
                  title: "Instant Confirmation",
                  description: "QR codes delivered immediately via email",
                  gradient: "from-primary to-olive",
                },
              ].map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-olive/10 -z-10" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Reserve Your Stall?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Don't miss out on the opportunity to showcase your books at Colombo BookFair 2026.
              Limited stalls available!
            </p>
            <Button
              size="lg"
              variant="gradient"
              className="h-14 px-10 text-lg gap-2"
              onClick={() => navigate("/reserve")}
            >
              Browse Stalls Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
