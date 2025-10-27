"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, className = "", onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 sm:px-8 py-3 sm:py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

