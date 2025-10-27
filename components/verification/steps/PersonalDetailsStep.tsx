"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, ArrowLeft } from "lucide-react"
import type { PersonalDetails } from "../VerificationFlow"

interface PersonalDetailsStepProps {
  initialValues: PersonalDetails
  onSubmit: (details: PersonalDetails) => void
  onGoBack: () => void
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ initialValues, onSubmit, onGoBack }) => {
  const [formData, setFormData] = useState<PersonalDetails>(initialValues)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div>
      <h2 className="text-xl font-bold tracking-tighter text-black mb-6">Personal Details</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Middle Name */}
          <div className="flex flex-col">
            <label htmlFor="middleName" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              id="middleName"
              name="middleName"
              type="text"
              value={formData.middleName}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your middle name (optional)"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-400"
              >
                <Calendar className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex h-11 rounded-xl border border-gray-300 bg-gray-200 overflow-hidden">
              <div className="flex items-center px-3 border-r border-gray-300 bg-gray-300">
                <span className="text-sm font-medium">+1</span>
              </div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="flex-1 px-4 bg-transparent focus:outline-none"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-gray-300 bg-gray-200 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              >
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Address - Full Width */}
        <div className="mt-6">
          <label htmlFor="address" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Enter your full address"
            required
          />
        </div>

        {/* City, State, Zip in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter city"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              State/Province
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter state"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zipCode" className="text-sm font-medium tracking-tighter text-gray-700 mb-2">
              ZIP/Postal Code
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleChange}
              className="h-11 rounded-xl border border-gray-300 bg-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter ZIP code"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-8">
          <button
            type="button"
            onClick={onGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium tracking-tighter text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="submit"
            className="flex items-center justify-center px-8 py-3 text-base font-bold tracking-tighter text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm hover:shadow-md transition-colors"
          >
            Save and Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailsStep

