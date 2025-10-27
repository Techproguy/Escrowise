"use client"

import type React from "react"
import type { InputHTMLAttributes } from "react"

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: string
  height?: string
  error?: string
}

const FormField: React.FC<FormFieldProps> = ({ label, className = "", height = "h-[55px]", error, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-base sm:text-lg font-medium tracking-tighter text-black mb-2">{label}</label>
      <input
        className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${height} ${className} ${error ? "border-red-500 bg-red-50" : ""}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default FormField

