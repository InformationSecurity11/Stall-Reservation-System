import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "gradient"
  | "secondary"
  | "link"

type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  
  default: "bg-neutral-600 text-white shadow-sm",
  outline: "bg-transparent border border-border text-foreground",
  ghost: "bg-transparent hover:bg-muted/30 text-foreground",
  gradient: "bg-gradient via-secondary to-olive text-white shadow-md",
  secondary: "bg-secondary text-white shadow-sm",
  link: "text-primary underline-offset-4 hover:underline bg-transparent",
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  default: "h-10 px-4",
  sm: "h-8 px-3 text-sm",
  lg: "h-14 px-6 text-lg",
  icon: "h-10 w-10 p-0",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const Comp: any = props.asChild ? (props as any).asChild : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export default Button
