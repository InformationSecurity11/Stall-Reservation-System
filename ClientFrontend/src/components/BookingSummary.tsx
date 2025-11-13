"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, DollarSign, X, ShoppingCart, ArrowRight } from "lucide-react"
import type { Stall } from "./StallCard"

interface BookingSummaryProps {
  selectedStalls: Stall[]
  selectedDate: Date | null
  onRemoveStall: (stallId: string) => void
  onContinue: () => void
  maxStalls?: number
}

export default function BookingSummary({
  selectedStalls,
  selectedDate,
  onRemoveStall,
  onContinue,
  maxStalls = 3,
}: BookingSummaryProps) {
  const subtotal = selectedStalls.reduce((sum, stall) => sum + stall.price, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const remainingSlots = maxStalls - selectedStalls.length

  return (
    <Card className="sticky top-24 border-2 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Booking Summary
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-6">
        {/* Selection Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Selected Stalls</span>
            <Badge variant={selectedStalls.length > 0 ? "default" : "outline"}>
              {selectedStalls.length} / {maxStalls}
            </Badge>
          </div>

          {remainingSlots > 0 && (
            <p className="text-xs text-muted-foreground">
              You can select {remainingSlots} more {remainingSlots === 1 ? "stall" : "stalls"}
            </p>
          )}

          {selectedStalls.length >= maxStalls && (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                Maximum stall limit reached
              </p>
            </div>
          )}
        </div>

        {/* Selected Date */}
        {selectedDate && (
          <div className="p-3 rounded-xl bg-primary/5 border-2 border-primary/20">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        )}

        <Separator />

        {/* Selected Stalls List */}
        {selectedStalls.length > 0 ? (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {selectedStalls.map((stall) => (
              <div
                key={stall.id}
                className="p-3 rounded-xl bg-card border-2 border-border/50 hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-foreground truncate">
                        {stall.name}
                      </h4>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {stall.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{stall.location}</span>
                    </div>
                    <p className="text-sm font-bold text-primary">
                      LKR {stall.price.toLocaleString()}/day
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => onRemoveStall(stall.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-destructive/10 hover:text-destructive shrink-0 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No stalls selected yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Select up to {maxStalls} stalls to continue
            </p>
          </div>
        )}

        {selectedStalls.length > 0 && (
          <>
            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="font-medium">LKR {tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base pt-2">
                <span className="font-bold text-foreground">Total</span>
                <div className="text-right">
                  <p className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    LKR {total.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="pt-6">
        <Button
          variant="gradient"
          size="lg"
          className="w-full group"
          disabled={selectedStalls.length === 0 || !selectedDate}
          onClick={onContinue}
        >
          Continue to Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>

      {/* Help Text */}
      {selectedStalls.length === 0 && (
        <div className="px-6 pb-6">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              💡 Tip: Select your preferred stalls and date to proceed with booking
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
