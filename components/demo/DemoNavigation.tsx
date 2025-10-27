"use client"
import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const DemoNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <h3 className="text-sm font-bold mb-2 text-gray-700">Demo Pages</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/demo/transaction-created"
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              Transaction Created
            </Link>
          </li>
          <li>
            <Link
              href="/demo"
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              Transaction Details
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DemoNavigation

