"use client"

import type React from "react"
import type { AccountType } from "../VerificationFlow"

interface AccountTypeStepProps {
  selectedType: AccountType
  onSubmit: (type: AccountType) => void
}

const AccountTypeStep: React.FC<AccountTypeStepProps> = ({ selectedType, onSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tighter text-black mb-4">Account type</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <button
          onClick={() => onSubmit("individual")}
          className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
            selectedType === "individual"
              ? "border-amber-400 bg-gray-200"
              : "border-gray-200 bg-gray-200 hover:bg-gray-300"
          }`}
          aria-pressed={selectedType === "individual"}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
            {selectedType === "individual" && <div className="w-3 h-3 rounded-full bg-amber-400"></div>}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Individual</h3>
            <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">Buy or sell under your own name.</p>
          </div>
        </button>

        <button
          onClick={() => onSubmit("company")}
          className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
            selectedType === "company"
              ? "border-amber-400 bg-gray-200"
              : "border-gray-200 bg-gray-200 hover:bg-gray-300"
          }`}
          aria-pressed={selectedType === "company"}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
            {selectedType === "company" && <div className="w-3 h-3 rounded-full bg-amber-400"></div>}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Company</h3>
            <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">
              Buy or sell under your business' name.
            </p>
          </div>
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSubmit(selectedType)}
          className="px-8 py-3 text-base font-bold tracking-tighter text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm hover:shadow-md transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default AccountTypeStep

