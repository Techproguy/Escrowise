"use client"

import type React from "react"
import { useState } from "react"

interface TransactionTabsProps {
  onTabChange: (tab: string) => void
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All" },
    { id: "action-required", label: "Action Required" },
    { id: "open", label: "Open" },
    { id: "closed", label: "Closed" },
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-3 text-sm font-medium tracking-tighter whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-gray-600 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TransactionTabs

