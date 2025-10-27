"use client"
import type React from "react"
import { useState } from "react"

interface Item {
  name: string
  price: string
  description: string
  category: string
}

interface TransactionSummaryProps {
  items: Item[]
}

function TransactionSummary({ items }: TransactionSummaryProps) {
  const [feePaidBy, setFeePaidBy] = useState("Buyer")

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeePaidBy(e.target.value)
  }

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price) || 0
    return sum + price
  }, 0)

  // Calculate escrow fee (3.25% of subtotal)
  const escrowFee = subtotal * 0.0325

  // Calculate buyer price and seller proceeds based on who pays the fee
  const buyerPrice =
    feePaidBy === "Buyer" || feePaidBy === "Split"
      ? subtotal + (feePaidBy === "Split" ? escrowFee / 2 : escrowFee)
      : subtotal

  const sellerProceeds =
    feePaidBy === "Seller" || feePaidBy === "Split"
      ? subtotal - (feePaidBy === "Split" ? escrowFee / 2 : escrowFee)
      : subtotal

  return (
    <section>
      <h2 className="mb-5 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-black">
        Transaction summary
      </h2>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <p className="text-base sm:text-lg text-gray-700">Subtotal:</p>
          <p className="text-base sm:text-lg font-medium text-black">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-2 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <p className="text-base sm:text-lg text-gray-700">Escrow fee paid by:</p>
            <select
              className="text-base sm:text-lg font-medium text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-400 py-1"
              value={feePaidBy}
              onChange={handleChange}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Split">Split</option>
            </select>
          </div>
          <p className="text-base sm:text-lg font-medium text-black">${escrowFee.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <p className="text-base sm:text-lg text-gray-700">Buyer Price:</p>
          <p className="text-base sm:text-lg font-medium text-black">${buyerPrice.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-base sm:text-lg font-medium text-black">Seller proceeds:</p>
          <p className="text-base sm:text-lg font-bold text-black">${sellerProceeds.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}

export default TransactionSummary

