"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  width?: "full" | "partial"
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top"
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function Reveal({
  children,
  className,
  width = "full",
  direction = "left-to-right",
  delay = 0,
  duration = 800,
  once = true,
  threshold = 0.1,
}: RevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsRevealed(false)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  const getDirectionStyles = () => {
    switch (direction) {
      case "left-to-right":
        return "left-0"
      case "right-to-left":
        return "right-0"
      case "top-to-bottom":
        return "top-0"
      case "bottom-to-top":
        return "bottom-0"
      default:
        return "left-0"
    }
  }

  const getTransformStyles = () => {
    switch (direction) {
      case "left-to-right":
        return isRevealed ? "translate-x-full" : "translate-x-0"
      case "right-to-left":
        return isRevealed ? "translate-x-[-100%]" : "translate-x-0"
      case "top-to-bottom":
        return isRevealed ? "translate-y-full" : "translate-y-0"
      case "bottom-to-top":
        return isRevealed ? "translate-y-[-100%]" : "translate-y-0"
      default:
        return isRevealed ? "translate-x-full" : "translate-x-0"
    }
  }

  const isHorizontal = direction === "left-to-right" || direction === "right-to-left"

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
      <div
        className={cn(
          "absolute inset-0 bg-orange-400 transform transition-transform",
          getDirectionStyles(),
          getTransformStyles(),
          {
            "w-full": width === "full" && isHorizontal,
            "w-[105%]": width === "partial" && isHorizontal,
            "h-full": width === "full" && !isHorizontal,
            "h-[105%]": width === "partial" && !isHorizontal,
          },
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

