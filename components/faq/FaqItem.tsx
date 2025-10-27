"use client"
import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
  question: string
  answer?: string
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col bg-[#F5EFD6] rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={toggleExpand}
        className="flex justify-between items-center w-full p-4 sm:p-6 lg:pt-8 lg:pr-16 lg:pb-6 lg:pl-10 text-left"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter text-black pr-4">{question}</h3>
        <ChevronDown
          className={`h-6 w-6 sm:h-8 sm:w-8 text-orange-400 flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && answer && (
        <div className="px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 lg:pb-8">
          <p className="text-base sm:text-lg tracking-tighter text-black">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default FaqItem

