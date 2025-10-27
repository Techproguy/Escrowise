import type { Metadata } from "next"
import { SettingsTabs } from "@/components/admin/settings/SettingsTabs"

export const metadata: Metadata = {
  title: "Settings - Admin Dashboard",
  description: "Configure system settings for the escrow platform",
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Settings</h1>

      <SettingsTabs />
    </div>
  )
}

