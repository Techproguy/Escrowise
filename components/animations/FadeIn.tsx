"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  center?: boolean
}

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 500,
  once = true,
  threshold = 0.1,
  center = false,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
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
      case "up":
        return "translate-y-10"
      case "down":
        return "translate-y-[-10px]"
      case "left":
        return "translate-x-10"
      case "right":
        return "translate-x-[-10px]"
      default:
        return ""
    }
  }

  return (
    <div ref={ref} className={cn(center ? "flex justify-center items-center" : "", className)}>
      {children}
    </div>
  )
}

