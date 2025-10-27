"use client"

import type React from "react"
import { Edit } from "lucide-react"

interface PersonalDetails {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface VerificationSummaryProps {
  personalDetails: PersonalDetails
  onEdit: () => void
  onVerify: () => void
}

const VerificationSummary: React.FC<VerificationSummaryProps> = ({ personalDetails, onEdit, onVerify }) => {
  const { firstName, middleName, lastName, dateOfBirth, address, city, state, zipCode, country } = personalDetails

  const fullName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`

  const fullAddress = `${address}, ${city}, ${state} ${zipCode}, ${country}`

  return (
    <div className="border border-orange-200 rounded-xl p-6 sm:p-8 bg-orange-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-bold tracking-tighter text-black">Personal Details</h3>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onVerify}
            className="px-5 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
          >
            Verify Now
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-medium text-black">{fullName}</p>
        <p className="text-base text-gray-700">{dateOfBirth}</p>
        <p className="text-base text-gray-700">{fullAddress}</p>
      </div>
    </div>
  )
}

export default VerificationSummary

