"use client"

import type React from "react"
import Header from "@/components/dashboard/Header"
import UnavailableFeatureMessage from "./UnavailableFeatureMessage"
import GoBackButton from "./GoBackButton"
import { useRouter } from "next/navigation"
import { Puzzle, Zap, Lock, Database, Bell, Code } from "lucide-react"

const IntegrationsPage: React.FC = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  // Sample integration categories that will be available
  const integrationCategories = [
    {
      id: "payment",
      name: "Payment Gateways",
      description: "Connect popular payment processors to handle transactions",
      icon: <Zap className="w-6 h-6 text-orange-400" />,
      examples: ["Stripe", "PayPal", "Square"],
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Enable blockchain-based transactions and payments",
      icon: <Lock className="w-6 h-6 text-orange-400" />,
      examples: ["Bitcoin", "Ethereum", "Solana"],
    },
    {
      id: "database",
      name: "Database Connections",
      description: "Sync transaction data with your existing systems",
      icon: <Database className="w-6 h-6 text-orange-400" />,
      examples: ["MongoDB", "PostgreSQL", "Firebase"],
    },
    {
      id: "notifications",
      name: "Notification Services",
      description: "Send alerts and updates through multiple channels",
      icon: <Bell className="w-6 h-6 text-orange-400" />,
      examples: ["Email", "SMS", "Push Notifications"],
    },
    {
      id: "api",
      name: "API & Webhooks",
      description: "Build custom integrations with our robust API",
      icon: <Code className="w-6 h-6 text-orange-400" />,
      examples: ["REST API", "GraphQL", "Webhooks"],
    },
  ]

  return (
    <main className="flex flex-col bg-zinc-100 min-h-screen">
      <Header />

      <section className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">My Integrations</h1>
          <GoBackButton onClick={handleGoBack} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <UnavailableFeatureMessage />
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-4">Coming Soon</h2>
          <p className="text-base text-gray-700 mb-6">
            We're working on bringing you powerful integration options to enhance your escrow experience. Here's a
            preview of what you can expect:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg">{category.icon}</div>
                  <h3 className="text-lg font-bold tracking-tighter text-black">{category.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, index) => (
                    <span key={index} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Puzzle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-black mb-2">
                Need a specific integration?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                We're prioritizing our integration roadmap based on user feedback. Let us know which integrations would
                be most valuable for your business, and we'll consider adding them to our development pipeline.
              </p>
              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors">
                Request Integration
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default IntegrationsPage

