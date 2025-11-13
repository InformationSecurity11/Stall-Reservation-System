"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Users, Wifi, Zap, CheckCircle2, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Stall {
  id: string
  name: string
  location: string
  hall: "Hall A" | "Hall B" | "Outdoor"
  type: "Standard" | "Corner" | "Premium"
  price: number
  size: string
  amenities: string[]
  available: boolean
  isPopular?: boolean
  image?: string
}

interface StallCardProps {
  stall: Stall
  isSelected: boolean
  onSelect: (stallId: string) => void
  disabled?: boolean
}

export default function StallCard({ stall, isSelected, onSelect, disabled }: StallCardProps) {
  const [imageError, setImageError] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-gradient-to-r from-olive to-olive/80 text-white"
      case "Corner":
        return "bg-gradient-to-r from-secondary to-secondary/80 text-white"
      default:
        return "bg-gradient-to-r from-primary to-primary/80 text-white"
    }
  }

  const getHallColor = (hall: string) => {
    switch (hall) {
      case "Hall A":
        return "border-primary/30 text-primary bg-primary/5"
      case "Hall B":
        return "border-secondary/30 text-secondary bg-secondary/5"
      case "Outdoor":
        return "border-olive/30 text-olive bg-olive/5"
      default:
        return "border-border/30 text-foreground bg-muted/5"
    }
  }

  const amenityIcons: Record<string, any> = {
    "Wi-Fi": Wifi,
    "Power": Zap,
    "High Traffic": Users,
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 cursor-pointer",
        isSelected
          ? "border-primary shadow-xl shadow-primary/20 scale-[1.02]"
          : "hover:border-primary/50 hover:shadow-lg",
        !stall.available && "opacity-60 cursor-not-allowed",
        disabled && "cursor-not-allowed"
      )}
      onClick={() => !disabled && stall.available && onSelect(stall.id)}
    >
      {/* Popular Badge */}
      {stall.isPopular && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="default" className="gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </Badge>
        </div>
      )}

      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10">
          <div className="w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Stall Image */}
      <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted/30 overflow-hidden">
        {!imageError && stall.image ? (
          <img
            src={stall.image}
            alt={stall.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">{stall.name}</p>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Type Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className={cn("text-xs font-bold shadow-lg", getTypeColor(stall.type))}>
            {stall.type}
          </Badge>
        </div>

        {/* Availability Status */}
        {!stall.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-bold">
              Not Available
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Stall Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-foreground leading-tight">{stall.name}</h3>
            <Badge variant="outline" className={cn("text-xs shrink-0", getHallColor(stall.hall))}>
              {stall.hall}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{stall.location}</span>
          </div>
        </div>

        {/* Size & Price */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/30 border-2 border-border/30">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Size</p>
            <p className="font-bold text-foreground">{stall.size}</p>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Price/Day</p>
            <p className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-primary" />
              {stall.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Amenities */}
        {stall.amenities.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {stall.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || CheckCircle2
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-xs font-medium text-primary"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {amenity}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Select Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          disabled={!stall.available || disabled}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled && stall.available) onSelect(stall.id)
          }}
        >
          {isSelected ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Selected
            </>
          ) : (
            "Select Stall"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
