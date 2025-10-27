"use client"
import type * as React from "react"

interface CategoryProps {
  name: string
  isActive: boolean
  onClick: () => void
}

const Category: React.FC<CategoryProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      className={`w-full text-left px-4 py-3 transition-colors rounded-lg ${
        isActive ? "font-bold text-amber-600 bg-amber-50" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

interface HelpDeskSidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export const HelpDeskSidebar: React.FC<HelpDeskSidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = ["Process", "Verification", "Shipment", "Payment", "Security", "Returns"]

  return (
    <div className="w-full lg:w-64 mb-6 lg:mb-0">
      <h2 className="text-lg font-bold mb-4 px-4">Categories</h2>
      <nav className="flex flex-col gap-1">
        {categories.map((category) => (
          <Category
            key={category}
            name={category}
            isActive={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          />
        ))}
      </nav>
    </div>
  )
}

