"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, className = "", priority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset loaded state when src changes
    setIsLoaded(false)
  }, [src])

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "loaded" : "loading"}`}
      onLoad={() => setIsLoaded(true)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
    />
  )
}

