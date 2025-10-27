"use client"
import type React from "react"
import { useState } from "react"

interface NotificationSetting {
  id: string
  title: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
}

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "transaction-updates",
      title: "Transaction Updates",
      description: "Receive notifications about your transaction status changes",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "security-alerts",
      title: "Security Alerts",
      description: "Get notified about important security events related to your account",
      email: true,
      push: true,
      sms: true,
    },
    {
      id: "payment-confirmations",
      title: "Payment Confirmations",
      description: "Receive confirmations when payments are processed",
      email: true,
      push: false,
      sms: false,
    },
    {
      id: "marketing",
      title: "Marketing & Promotions",
      description: "Stay updated with our latest features, promotions, and news",
      email: false,
      push: false,
      sms: false,
    },
    {
      id: "system-notifications",
      title: "System Notifications",
      description: "Important updates about the Escrowise platform and maintenance",
      email: true,
      push: false,
      sms: false,
    },
  ])

  const handleToggle = (id: string, channel: "email" | "push" | "sms") => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, [channel]: !setting[channel] } : setting)))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-6">Notification Preferences</h2>

      <p className="text-gray-600 mb-8">
        Choose how and when you'd like to be notified about activity on your Escrowise account.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Notification Type</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 text-center">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 text-center">Push</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 text-center">SMS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.map((setting) => (
              <tr key={setting.id}>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{setting.title}</span>
                    <span className="text-sm text-gray-500">{setting.description}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.email}
                      onChange={() => handleToggle(setting.id, "email")}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                  </label>
                </td>
                <td className="px-4 py-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.push}
                      onChange={() => handleToggle(setting.id, "push")}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                  </label>
                </td>
                <td className="px-4 py-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.sms}
                      onChange={() => handleToggle(setting.id, "sms")}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold tracking-tighter text-black mb-4">Communication Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Summary</p>
              <p className="text-sm text-gray-500">Receive a weekly summary of your account activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-gray-500">Receive our monthly newsletter with updates and tips</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}

export default NotificationSettings

