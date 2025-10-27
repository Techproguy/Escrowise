"use client"
import { cn } from "@/lib/utils"
import type React from "react"

interface PulseProps {
  children: React.ReactNode
  className?: string
  duration?: number
  infinite?: boolean
}

export function Pulse({ children, className, duration = 2000, infinite = true }: PulseProps) {
  return (
    <div
      className={cn(
        "animate-pulse",
        {
          "animation-iteration-count-infinite": infinite,
        },
        className,
      )}
      style={{
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

