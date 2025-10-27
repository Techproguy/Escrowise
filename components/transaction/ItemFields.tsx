"use client"

import type React from "react"
import { useState } from "react"
import Button from "./Button"
import FormField from "./FormField"

interface Item {
  name: string
  price: string
  description: string
}

const ItemFields: React.FC = () => {
  const [item, setItem] = useState<Item>({
    name: "",
    price: "",
    description: "",
  })

  const [items, setItems] = useState<Item[]>([])
  const [errors, setErrors] = useState<Partial<Item>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof Item]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateItem = () => {
    const newErrors: Partial<Item> = {}

    if (!item.name.trim()) {
      newErrors.name = "Item name is required"
    }

    if (!item.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(item.price)) || Number.parseFloat(item.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    if (!item.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddItem = () => {
    if (validateItem()) {
      setItems([...items, item])
      setItem({ name: "", price: "", description: "" })
    }
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <FormField
          label="Item Name"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Enter item name"
          error={errors.name}
        />

        <FormField
          label="Price (USD)"
          name="price"
          type="text"
          value={item.price}
          onChange={handleChange}
          placeholder="0.00"
          error={errors.price}
        />
      </div>

      <div className="mb-6">
        <label className="text-base sm:text-lg font-medium tracking-tighter text-black mb-2 block">
          Item Description
        </label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Provide details about the item"
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all min-h-[120px] resize-y ${errors.description ? "border-red-500 bg-red-50" : ""}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Added Items</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-medium">${Number.parseFloat(item.price).toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>
    </div>
  )
}

export default ItemFields

