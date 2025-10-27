"use client"
import type React from "react"
import { AlertCircle } from "lucide-react"

const AlertBox: React.FC = () => {
  return (
    <section className="p-4 sm:p-6 rounded-xl sm:rounded-3xl bg-amber-100">
      <header className="flex gap-2 sm:gap-2.5 items-center mb-3 sm:mb-5">
        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
        <h2 className="text-lg sm:text-xl font-bold tracking-tighter text-amber-800">Domain Transfer Required</h2>
      </header>
      <p className="text-base sm:text-lg tracking-tighter text-amber-800">
        <span className="font-bold">The payment has been received and secured in escrow.</span> The seller now needs to
        transfer the domain to the buyer. Please follow the domain transfer instructions provided and update the status
        once completed.
      </p>
    </section>
  )
}

export default AlertBox

