"use client"

import type React from "react"
import type { Transaction } from "./types"
import StatusBadge from "./StatusBadge"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface TransactionTableProps {
  transactions: Transaction[]
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 10h10" />
            <path d="M7 14h10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold tracking-tighter text-black mb-2">No transactions found</h3>
        <p className="text-base text-gray-500 max-w-md">
          There are no transactions matching your current filters. Try adjusting your search or filter criteria.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop and tablet view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">ID</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">Transaction Title</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">Created</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">Amount</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">Role</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">Status</th>
              <th className="p-4 text-sm font-medium tracking-tighter text-left text-gray-600">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="p-4 text-sm tracking-tighter text-black">#{transaction.id}</td>
                <td className="p-4 text-sm tracking-tighter text-black font-medium">{transaction.title}</td>
                <td className="p-4 text-sm tracking-tighter text-gray-600">{transaction.created}</td>
                <td className="p-4 text-sm tracking-tighter text-black">
                  <span className="font-medium">{transaction.amount}</span>
                  <span className="text-gray-600"> {transaction.currency}</span>
                </td>
                <td className="p-4 text-sm tracking-tighter text-gray-600">{transaction.role}</td>
                <td className="p-4">
                  <StatusBadge type={transaction.status.type} text={transaction.status.text} />
                </td>
                <td className="p-4 text-right">
                  <Link href={`/dashboard/transaction/${transaction.id}`}>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden space-y-4">
        {transactions.map((transaction) => (
          <Link
            href={`/dashboard/transaction/${transaction.id}`}
            key={transaction.id}
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-base font-medium tracking-tighter text-black mb-1">{transaction.title}</h3>
                <p className="text-xs text-gray-500">
                  #{transaction.id} • {transaction.created}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{transaction.role}</span>
              <span className="text-sm font-medium">
                {transaction.amount} {transaction.currency}
              </span>
            </div>
            <div>
              <StatusBadge type={transaction.status.type} text={transaction.status.text} />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default TransactionTable

