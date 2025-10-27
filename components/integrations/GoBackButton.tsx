"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"

interface GoBackButtonProps {
  onClick?: () => void
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Go Back</span>
    </button>
  )
}

export default GoBackButton

