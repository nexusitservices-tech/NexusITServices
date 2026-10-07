import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 
    | "default" 
    | "secondary" 
    | "destructive" 
    | "outline" 
    | "success" 
    | "warning" 
    | "info"
    | "emerald-subtle"
    | "blue-subtle"
    | "amber-subtle"
    | "neutral-subtle"
  children?: React.ReactNode
  className?: string
  dot?: boolean
}

function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variants = {
    default: "border-blue-600/30 bg-blue-50 text-[#0046AF]",
    secondary: "border-slate-200/80 bg-slate-100/80 text-slate-700",
    "emerald-subtle": "border-blue-600/20 bg-blue-50/90 text-[#0046AF] shadow-2xs",
    "blue-subtle": "border-blue-600/20 bg-blue-50/90 text-[#0046AF] shadow-2xs",
    "amber-subtle": "border-amber-600/20 bg-amber-50/90 text-amber-800 shadow-2xs",
    "neutral-subtle": "border-slate-200 bg-white text-slate-700 shadow-2xs",
    destructive: "border-red-200 bg-red-50 text-red-700",
    outline: "text-slate-700 border-slate-300 bg-white",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-blue-200 bg-blue-50 text-[#0046AF]",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />}
      {children}
    </div>
  )
}

export { Badge }
