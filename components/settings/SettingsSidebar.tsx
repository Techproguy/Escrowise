"use client"

import type React from "react"
import { User, Shield, Bell, CreditCard, Link } from "lucide-react"

type SettingsTab = "profile" | "security" | "notifications" | "payment-methods" | "integrations"

interface SettingsSidebarProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "profile" as SettingsTab,
      label: "Profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "security" as SettingsTab,
      label: "Security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "notifications" as SettingsTab,
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "payment-methods" as SettingsTab,
      label: "Payment Methods",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "integrations" as SettingsTab,
      label: "Connected Accounts",
      icon: <Link className="w-5 h-5" />,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <nav>
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id ? "bg-orange-50 text-orange-500 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SettingsSidebar

