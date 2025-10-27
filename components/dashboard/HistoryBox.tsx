"use client"
import type React from "react"
import { History } from "lucide-react"

const HistoryBox: React.FC = () => {
  const historyEntries = [
    {
      date: "April 2, 2025, 10:15 AM GMT+1",
      action: "Payment received and secured in escrow",
    },
    {
      date: "March 27, 2025, 3:43 PM GMT+1",
      action: "Buyer initiates the transaction",
    },
  ]

  return (
    <section className="p-4 sm:p-6 rounded-xl sm:rounded-3xl bg-gray-200">
      <header className="flex gap-2 sm:gap-2.5 items-center mb-3 sm:mb-5">
        <History className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        <h2 className="text-lg sm:text-xl font-bold tracking-tighter text-gray-800">History</h2>
      </header>

      <div className="space-y-3">
        {historyEntries.map((entry, index) => (
          <p key={index} className="text-base sm:text-lg tracking-tighter text-gray-800">
            <strong>{entry.date}</strong>
            <span> {entry.action}</span>
          </p>
        ))}
      </div>
    </section>
  )
}

export default HistoryBox

