"use client"
import type React from "react"
import { CreditCard } from "lucide-react"

const PaymentInfo: React.FC = () => {
  return (
    <section className="p-6 sm:p-8 mb-8 bg-white rounded-xl sm:rounded-3xl shadow-sm">
      <header className="flex gap-2.5 items-center mb-6 sm:mb-8">
        <CreditCard className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-black">
          Payment processing fees
        </h2>
      </header>

      <p className="mb-6 sm:mb-8 text-base sm:text-lg tracking-tighter text-gray-700">
        Depending on the payment method you will use, there may be additional processing fees as outlined below.
      </p>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <span className="text-base sm:text-lg tracking-tighter text-gray-800">International wire transfer</span>
        <span className="text-base sm:text-lg font-medium tracking-tighter text-gray-800">$ 25.00</span>
      </div>
    </section>
  )
}

export default PaymentInfo

