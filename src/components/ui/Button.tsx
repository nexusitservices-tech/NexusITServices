import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 
    | "default" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | "link" 
    | "premium" 
    | "mui-primary" 
    | "mui-outlined" 
    | "once-pill"
    | "maya-primary" 
    | "maya-yellow" 
    | "maya-outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-[#0046AF] text-white hover:bg-[#00388C] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
      "mui-primary": "bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white shadow-sm hover:shadow-md hover:shadow-blue-900/20 hover:-translate-y-0.5 active:translate-y-0 font-semibold",
      "mui-outlined": "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 font-semibold",
      "once-pill": "rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md text-slate-800 hover:bg-white hover:border-[#0046AF] hover:text-[#0046AF] shadow-2xs hover:shadow-sm font-medium",
      premium: "relative overflow-hidden bg-[#0046AF] text-white shadow-md hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "maya-primary": "bg-[color:var(--color-maya-blue)] text-white hover:bg-blue-700 rounded-full font-semibold shadow-xs hover:shadow-md",
      "maya-yellow": "bg-[color:var(--color-maya-yellow)] text-slate-900 hover:bg-yellow-500 rounded-full font-semibold shadow-xs hover:shadow-md",
      "maya-outline": "border border-slate-300 text-slate-700 hover:border-[#0046AF] hover:text-[#0046AF] rounded-full font-semibold bg-white",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      outline: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-2xs",
      secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/60 shadow-2xs",
      ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      link: "text-[#0046AF] underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-10 px-4 py-2 rounded-xl text-sm",
      sm: "h-8.5 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-2xl px-6 text-base",
      icon: "h-10 w-10 rounded-xl",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0046AF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
