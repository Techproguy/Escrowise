"use client"

import type React from "react"
import type { AccountType, PersonalDetails } from "../VerificationFlow"

interface VerificationSummaryProps {
  accountType: AccountType
  personalDetails: PersonalDetails
  onEdit: () => void
}

const VerificationSummary: React.FC<VerificationSummaryProps> = ({ accountType, personalDetails, onEdit }) => {
  const { firstName, middleName, lastName, dateOfBirth, address, city, state, zipCode, country } = personalDetails

  const fullName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`

  const formattedAddress = `${address}, ${city}, ${state} ${zipCode}, ${country}`

  return (
    <div>
      <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black mb-8">
        We protect both sides of the transaction by verifying the identity of all users. Your verified identity must be
        the same as the account holder's name on any bank account used to pay or receive funds from Escrowise.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tighter text-black mb-4">Account type</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div
            className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
              accountType === "individual" ? "border-amber-400 bg-gray-200" : "border-gray-200 bg-gray-200"
            }`}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
              {accountType === "individual" && <div className="w-3 h-3 rounded-full bg-amber-400"></div>}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Individual</h3>
              <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">
                Buy or sell under your own name.
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-5 sm:p-6 text-left text-black rounded-xl sm:rounded-2xl border transition-all ${
              accountType === "company" ? "border-amber-400 bg-gray-200" : "border-gray-200 bg-gray-200"
            }`}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
              {accountType === "company" && <div className="w-3 h-3 rounded-full bg-amber-400"></div>}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Company</h3>
              <p className="text-sm sm:text-base tracking-tighter text-gray-600 mt-1">
                Buy or sell under your business' name.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-bold tracking-tighter text-black">Personal Details</h2>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="text-amber-600 font-medium">Under Review</span>
            <button
              onClick={onEdit}
              className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-base font-medium text-black">{fullName}</p>
          <p className="text-sm text-gray-700 mt-1">{dateOfBirth}</p>
          <p className="text-sm text-gray-700 mt-1">{formattedAddress}</p>
        </div>
      </div>
    </div>
  )
}

export default VerificationSummary

