"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, User, Phone, Sparkles, ArrowRight, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Shield } from "lucide-react"

export function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    setLoading(true)

    try {
      // TODO: Replace with actual API call
      console.log("Signup attempt:", formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to login after successful signup
      navigate("/login")
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Password strength calculator
  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "bg-muted" }
    if (password.length < 8) return { strength: 25, label: "Weak", color: "bg-red-500" }
    if (password.length < 12) return { strength: 50, label: "Fair", color: "bg-yellow-500" }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { strength: 75, label: "Good", color: "bg-blue-500" }
    return { strength: 100, label: "Strong", color: "bg-green-500" }
  }

  const strength = passwordStrength(formData.password)

  return (
  <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,rgba(124,58,237,0.06),rgba(16,185,129,0.035),rgba(236,72,153,0.06))] p-4 relative overflow-hidden py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
  <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(124,58,237,0.16)] rounded-full filter blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-[rgba(16,185,129,0.12)] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[rgba(236,72,153,0.12)] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

      <div className="w-full max-w-2xl relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[rgb(124,58,237)] group-hover:text-[rgb(16,185,129)] transition-colors duration-300" />
                </div>
              </div>
            </div>
              <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)]">
                BookFair <span className="text-[rgb(16,185,129)]">Hub</span>
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                Colombo 2026
              </span>
            </div>
          </Link>
        </div>

  <Card className="border-2 border-[rgba(124,58,237,0.08)] shadow-2xl">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-[rgb(124,58,237)] to-[rgb(236,72,153)]">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center text-base">
              Join thousands of vendors at Colombo BookFair 2026
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/20 flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold">
                    First Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-12 h-12"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 pointer-events-none" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-12 h-12"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 h-12"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number
                </Label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+94 XX XXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-12 h-12"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 pr-12 h-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${strength.color}`}
                        style={{ width: `${strength.strength}%` }}
                      />
                    </div>
                    {strength.label && (
                      <p className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>
                        Password strength: {strength.label}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-12 pr-12 h-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    disabled={loading}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 animate-fade-in">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <p className="text-xs font-medium text-green-500">Passwords match</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <p className="text-xs font-medium text-destructive">Passwords don't match</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border-2 border-border/30">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  disabled={loading}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-[rgb(16,185,129)] hover:text-[rgb(16,185,129)]/80 transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-[rgb(16,185,129)] hover:text-[rgb(16,185,129)]/80 transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full group bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white"
                disabled={loading || !acceptTerms}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Shield className="w-4 h-4" />
                <span>Your data is encrypted and secure</span>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6 border-t border-border/50">
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)] hover:opacity-90 transition-all duration-300 hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Bottom Links */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors duration-300">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
