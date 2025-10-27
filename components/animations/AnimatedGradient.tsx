"use client"
import { useEffect, useRef } from "react"
import type React from "react"

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export function AnimatedGradient({
  children,
  className = "",
  colors = ["#F59E0B", "#D97706", "#FBBF24", "#F59E0B"],
  speed = 3,
}: AnimatedGradientProps) {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = gradientRef.current
    if (!element) return

    let start: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = ((timestamp - start) * speed) % 360

      element.style.backgroundImage = `linear-gradient(${progress}deg, ${colors.join(", ")})`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors, speed])

  return (
    <div
      ref={gradientRef}
      className={`bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent ${className}`}
      style={{ backgroundSize: "200% 200%" }}
    >
      {children}
    </div>
  )
}

