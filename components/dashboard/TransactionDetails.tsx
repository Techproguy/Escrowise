"use client"
import type React from "react"
import ProgressTracker from "./ProgressTracker"

const TransactionDetails: React.FC = () => {
  return (
    <article className="p-6 sm:p-8 mb-8 bg-white rounded-2xl sm:rounded-3xl shadow-sm">
      <h1 className="mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">
        Create a web application for Escrowise
      </h1>

      <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8">
        <span className="text-base sm:text-lg lg:text-xl tracking-tighter text-black">Transaction:</span>
        <span className="text-base sm:text-lg lg:text-xl tracking-tighter text-black font-medium">#13090867</span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-100 rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 8.5H12.75V5.75C12.75 3.26 10.74 1.25 8.25 1.25C5.76 1.25 3.75 3.26 3.75 5.75V8.5H2.5C2.09 8.5 1.75 8.84 1.75 9.25V14C1.75 14.41 2.09 14.75 2.5 14.75H14C14.41 14.75 14.75 14.41 14.75 14V9.25C14.75 8.84 14.41 8.5 14 8.5ZM10.25 8.5H6.25V5.75C6.25 4.65 7.15 3.75 8.25 3.75C9.35 3.75 10.25 4.65 10.25 5.75V8.5Z"
              fill="#F59E0B"
            />
          </svg>
        </div>
      </div>

      <p className="mb-6 sm:mb-8 text-base sm:text-lg tracking-tighter text-black">
        <a href="mailto:james.roberts@outlook.com" className="text-orange-700 hover:text-orange-800 underline">
          james.roberts@outlook.com
        </a>
        <span> is buying a web application from </span>
        <a href="mailto:joehilary03@gmail.com" className="text-orange-700 hover:text-orange-800 underline">
          joehilary03@gmail.com
        </a>
        <span>. The </span>
        <strong>inspection period</strong>
        <span> for this transaction is </span>
        <strong>5 calendar days.</strong>
      </p>

      <div className="mb-8 overflow-x-auto">
        <ProgressTracker currentStep={3} />
      </div>

      <div className="flex gap-2.5 items-center p-3 sm:p-4 rounded-xl bg-amber-100">
        <span className="bg-amber-500 rounded-full h-2 w-2" />
        <p className="text-sm sm:text-base lg:text-lg tracking-tight text-amber-800">Awaiting Domain Transfer</p>
      </div>
    </article>
  )
}

export default TransactionDetails

