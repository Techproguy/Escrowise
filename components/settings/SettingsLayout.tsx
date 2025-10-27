"use client"
import type React from "react"
import Header from "@/components/dashboard/Header"
import SettingsSidebar from "./SettingsSidebar"
import { useState } from "react"
import ProfileSettings from "./ProfileSettings"
import SecuritySettings from "./SecuritySettings"
import NotificationSettings from "./NotificationSettings"
import PaymentMethodsSettings from "./PaymentMethodsSettings"
import IntegrationsSettings from "./IntegrationsSettings"

type SettingsTab = "profile" | "security" | "notifications" | "payment-methods" | "integrations"

const SettingsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <SecuritySettings />
      case "notifications":
        return <NotificationSettings />
      case "payment-methods":
        return <PaymentMethodsSettings />
      case "integrations":
        return <IntegrationsSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
      <Header />
      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 mx-auto w-full max-w-[1440px]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-8">Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </main>
  )
}

export default SettingsLayout

