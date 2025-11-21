import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CustomButton from "@/components/ui/CustomButton"
import BasicCard from "@/components/ui/BasicCard"
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
  const stepBadgeGradients = [
    "from-[rgb(124,58,237)] to-[rgb(16,185,129)]",
    "from-[rgb(16,185,129)] to-[rgb(236,72,153)]",
    "from-[rgb(236,72,153)] to-[rgb(124,58,237)]",
  ]

  const stepIconBg = [
    "bg-[rgba(124,58,237,0.08)]",
    "bg-[rgba(16,185,129,0.08)]",
    "bg-[rgba(236,72,153,0.08)]",
  ]

  const stepIconColor = [
    "text-[rgb(124,58,237)]",
    "text-[rgb(16,185,129)]",
    "text-[rgb(236,72,153)]",
  ]

  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-olive/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)]">
              <Sparkles className="w-4 h-4 mr-2" />
              Colombo BookFair 2026 - March 15-21
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)]">
              Reserve Your Perfect
              <br />
              BookFair Stall
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Secure premium exhibition space at Sri Lanka's premier book fair. Choose from
              indoor halls and outdoor pavilions with state-of-the-art amenities.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="w-auto">
                <Button
                  size="lg"
                  variant="gradient"
                  className="h-14 px-8 text-lg gap-2 bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white"
                  onClick={() => navigate("/reserve")}
                >
                  Browse Available Stalls
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-[rgba(124,58,237,0.12)] text-[rgb(124,58,237)]">
                  View Event Info
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: MapPin, label: "100+ Stalls", colorClass: "text-blue-600" },
                { icon: Users, label: "50K+ Visitors", colorClass: "text-green-600" },
                { icon: Calendar, label: "7 Days Event", colorClass: "text-yellow-600" },
                { icon: Shield, label: "100% Secure", colorClass: "text-slate-700" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.colorClass}`} />
                  <p className="font-semibold text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
  <section className="py-20 bg-[rgba(255,255,255,0.02)]">
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
                <div
                  key={idx}
                  className="relative p-6 bg-white rounded-lg shadow"
                >
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${stepBadgeGradients[idx]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {item.step}
                  </div>
                  <div className={`w-14 h-14 rounded-xl ${stepIconBg[idx]} flex items-center justify-center mb-4 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${stepIconColor[idx]}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
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
                  gradient: "from-[rgb(124,58,237)] to-[rgb(16,185,129)]",
                },
                {
                  icon: Shield,
                  title: "Secure Payment",
                  description: "Bank-grade encryption for all transactions",
                  gradient: "from-[rgb(16,185,129)] to-[rgb(236,72,153)]",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance for your queries",
                  gradient: "from-[rgb(236,72,153)] to-[rgb(124,58,237)]",
                },
                {
                  icon: CheckCircle2,
                  title: "Instant Confirmation",
                  description: "QR codes delivered immediately via email",
                  gradient: "from-[rgb(124,58,237)] to-[rgb(236,72,153)]",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex justify-center">
                  <BasicCard
                    title={
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}> 
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <span>{feature.title}</span>
                      </div>
                    }
                    description={feature.description}
                    buttonText={"Learn More"}
                    onButtonClick={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/6 via-secondary/4 to-olive/6" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/12 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Reserve Your Stall?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Don't miss out on the opportunity to showcase your books at Colombo BookFair 2026.
              Limited stalls available!
            </p>
            <div className="max-w-xs mx-auto">
              <CustomButton onClick={() => navigate("/reserve")}> 
                <div className="flex items-center justify-center gap-2">
                  <span>Browse Stalls Now</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </CustomButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
