"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { LinkProps } from "next/link"

interface EnhancedLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  prefetch?: boolean
}

export function EnhancedLink({ children, href, className = "", prefetch = true, ...props }: EnhancedLinkProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Handle click with transition
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (props.onClick) {
      props.onClick(e)
    }

    // If not prevented and is internal link
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && typeof href === "string" && href.startsWith("/")) {
      e.preventDefault()
      setIsTransitioning(true)

      // Short delay for animation
      setTimeout(() => {
        router.push(href.toString())
      }, 150)
    }
  }

  // Reset transition state when route changes
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsTransitioning(false)
    }

    // Listen for route change completion
    router.prefetch(href.toString())

    return () => {
      // Clean up
    }
  }, [href, router])

  return (
    <Link
      href={href}
      className={`${className} ${isTransitioning ? "opacity-70" : ""}`}
      onClick={handleClick}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  )
}

