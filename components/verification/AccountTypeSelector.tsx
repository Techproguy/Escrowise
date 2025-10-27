"use client"

import type React from "react"
import { useState } from "react"

type AccountType = "individual" | "company" | null

const AccountTypeSelector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<AccountType>("individual")

  const handleSelectType = (type: AccountType) => {
    setSelectedType(type)
  }

  return (
    <div className="mb-8 sm:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button
          onClick={() => handleSelectType("individual")}
          className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
            selectedType === "individual"
              ? "border-orange-400 bg-orange-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
          aria-pressed={selectedType === "individual"}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center">
            {selectedType === "individual" && <div className="w-3 h-3 rounded-full bg-orange-400"></div>}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Individual</h3>
            <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">Buy or sell under your own name.</p>
          </div>
        </button>

        <button
          onClick={() => handleSelectType("company")}
          className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
            selectedType === "company"
              ? "border-orange-400 bg-orange-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
          aria-pressed={selectedType === "company"}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center">
            {selectedType === "company" && <div className="w-3 h-3 rounded-full bg-orange-400"></div>}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Company</h3>
            <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">
              Buy or sell under your business' name.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AccountTypeSelector

