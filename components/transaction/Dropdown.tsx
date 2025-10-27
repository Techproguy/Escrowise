"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownProps {
  label: string
  value: string
  options?: string[]
  className?: string
  onChange?: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options = [], className = "", onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string) => {
    if (onChange) onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col w-full">
      <label className="text-base sm:text-lg font-medium tracking-tighter text-black mb-2">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex w-full items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white text-left focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${className}`}
        >
          <span className="text-base sm:text-lg tracking-tighter">{value}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </button>

        {isOpen && options.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-base hover:bg-orange-100 transition-colors"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown

