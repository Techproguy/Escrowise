"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"

interface ActionButtonsProps {
  onGoBack: () => void
  onSaveNext: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onGoBack, onSaveNext }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-8">
      <button
        onClick={onGoBack}
        className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium tracking-tighter text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>

      <button
        onClick={onSaveNext}
        className="flex items-center justify-center px-8 py-3 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 rounded-xl shadow-sm hover:shadow-md transition-colors"
      >
        Save and Next
      </button>
    </div>
  )
}

export default ActionButtons

