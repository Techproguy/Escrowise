"use client"
import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface ItemEntryFormProps {
  onAddItem: (item: {
    name: string
    price: string
    description: string
    category: string
  }) => void
}

function ItemEntryForm({ onAddItem }: ItemEntryFormProps) {
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const categories = [
    "Digital Products",
    "Physical Goods",
    "Services",
    "Real Estate",
    "Vehicles",
    "Collectibles",
    "Other",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const selectCategory = (category: string) => {
    setItem((prev) => ({ ...prev, category }))
    setIsDropdownOpen(false)
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      price: "",
      description: "",
      category: "",
    }

    let isValid = true

    if (!item.name.trim()) {
      newErrors.name = "Item name is required"
      isValid = false
    }

    if (!item.price.trim()) {
      newErrors.price = "Price is required"
      isValid = false
    } else if (isNaN(Number.parseFloat(item.price)) || Number.parseFloat(item.price) <= 0) {
      newErrors.price = "Please enter a valid price"
      isValid = false
    }

    if (!item.description.trim()) {
      newErrors.description = "Description is required"
      isValid = false
    }

    if (!item.category) {
      newErrors.category = "Please select a category"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onAddItem(item)
      setItem({
        name: "",
        price: "",
        description: "",
        category: "",
      })
    }
  }

  return (
    <div>
      <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tighter text-black">Transaction Details</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
            Item Category
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border ${
                errors.category ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-left`}
            >
              <span className={item.category ? "text-black" : "text-gray-500"}>
                {item.category || "Select Category"}
              </span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                <ul className="py-1 max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm hover:bg-orange-100 transition-colors"
                        onClick={() => selectCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">Item Name</label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              placeholder="Enter item name"
              className={`px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border ${
                errors.name ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
              Price (USD)
            </label>
            <input
              type="text"
              name="price"
              value={item.price}
              onChange={handleChange}
              placeholder="0.00"
              className={`px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border ${
                errors.price ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="mb-2 text-base sm:text-lg font-medium tracking-tighter text-black block">
            Item Description
          </label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Provide details about the item"
            rows={4}
            className={`px-4 sm:px-6 py-3 sm:py-4 w-full rounded-xl border ${
              errors.description ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-y`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 sm:px-12 py-3 sm:py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-sm hover:shadow-md"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemEntryForm

