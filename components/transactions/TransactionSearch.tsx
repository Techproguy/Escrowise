"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter } from "lucide-react"

interface TransactionSearchProps {
  onSearch: (query: string) => void
  onFilter: () => void
  totalTransactions: number
  visibleTransactions: number
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({
  onSearch,
  onFilter,
  totalTransactions,
  visibleTransactions,
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by ID or title"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
        <button
          onClick={onFilter}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
      <div className="text-sm text-gray-500 whitespace-nowrap">
        Showing {visibleTransactions} of {totalTransactions} transactions
      </div>
    </div>
  )
}

export default TransactionSearch

