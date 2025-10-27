"use client"

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  // Ensure we have a valid number before formatting
  const formattedCount = typeof value === "number" ? value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"

  return (
    <span id={`counter-${value}`} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}

