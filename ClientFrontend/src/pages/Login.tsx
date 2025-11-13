"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      console.log("Login attempt:", { email, password, rememberMe })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, just navigate to home
      navigate("/")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,rgba(124,58,237,0.06),rgba(16,185,129,0.035),rgba(236,72,153,0.06))] p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
  <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(124,58,237,0.16)] rounded-full filter blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-[rgba(16,185,129,0.12)] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[rgba(236,72,153,0.12)] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
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
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-base">
              Sign in to access your stall reservations
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

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[rgb(124,58,237)] transition-colors duration-300 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={loading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                  <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[rgb(16,185,129)] hover:text-[rgb(16,185,129)]/80 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full group bg-gradient-to-r from-[rgb(124,58,237)] via-[rgb(16,185,129)] to-[rgb(236,72,153)] text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6 border-t border-border/50">
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(124,58,237)] to-[rgb(236,72,153)] hover:opacity-90 transition-all duration-300 hover:underline underline-offset-4"
              >
                Create an account
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

export default Login
