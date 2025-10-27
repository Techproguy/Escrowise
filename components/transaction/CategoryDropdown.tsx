"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface CategoryDropdownProps {
  className?: string
  onChange?: (category: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ className = "", onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Select Category")

  const categories = ["Electronics", "Vehicles", "Real Estate", "Digital Assets", "Services", "Collectibles", "Other"]

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (category: string) => {
    setSelectedCategory(category)
    if (onChange) onChange(category)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col w-full mb-6">
      <label className="text-base sm:text-lg font-medium tracking-tighter text-black mb-2">Item Category</label>
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex w-full items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white text-left focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${className}`}
        >
          <span className="text-base sm:text-lg tracking-tighter">{selectedCategory}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-base hover:bg-orange-100 transition-colors"
                    onClick={() => handleSelect(category)}
                  >
                    {category}
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

export default CategoryDropdown

