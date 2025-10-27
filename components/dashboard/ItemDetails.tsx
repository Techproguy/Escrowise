"use client"
import type React from "react"
import { Package } from "lucide-react"

const ItemDetails: React.FC = () => {
  return (
    <section className="p-6 sm:p-8 mb-8 bg-white rounded-xl sm:rounded-3xl shadow-sm">
      <header className="flex gap-2.5 items-center mb-6 sm:mb-8">
        <Package className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-black">Item details</h2>
      </header>

      <h3 className="mb-3 sm:mb-5 text-lg sm:text-xl font-bold tracking-tighter text-gray-700">Escrowise webapp</h3>

      <p className="mb-6 sm:mb-8 text-base sm:text-lg tracking-tighter text-gray-700">
        A secure, user-friendly platform for managing escrow transactions with real-time tracking, automated fund
        releases, and built-in dispute resolution.
      </p>

      <div className="flex justify-between items-center mb-3 sm:mb-5 border-t border-gray-200 pt-4">
        <span className="text-sm sm:text-base tracking-tighter text-gray-600">Subtotal</span>
        <span className="text-sm sm:text-base tracking-tighter text-gray-600">$ 2,500.00</span>
      </div>

      <div className="flex justify-between items-center">
        <strong className="text-base sm:text-lg font-bold tracking-tighter text-black">Total (USD)</strong>
        <strong className="text-base sm:text-lg font-bold tracking-tighter text-black">$ 2,500.00</strong>
      </div>
    </section>
  )
}

export default ItemDetails

