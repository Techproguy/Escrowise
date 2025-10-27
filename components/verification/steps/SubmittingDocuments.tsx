"use client"

import type React from "react"

const SubmittingDocuments: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-md w-full text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <svg className="w-16 h-16 animate-spin" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
              <path d="M60 6 A54 54 0 0 1 114 60" fill="none" stroke="#9CA3AF" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Submitting Documents</h2>
          <p className="text-gray-400 text-sm">Please wait for a moment...</p>
        </div>
      </div>
    </div>
  )
}

export default SubmittingDocuments

