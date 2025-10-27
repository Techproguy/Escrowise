import type { Metadata } from "next"
import { AnalyticsOverview } from "@/components/admin/analytics/AnalyticsOverview"
import { TransactionChart } from "@/components/admin/analytics/TransactionChart"
import { UserGrowthChart } from "@/components/admin/analytics/UserGrowthChart"
import { RevenueMetrics } from "@/components/admin/analytics/RevenueMetrics"
import { TopPerformers } from "@/components/admin/analytics/TopPerformers"

export const metadata: Metadata = {
  title: "Analytics - Admin Dashboard",
  description: "Analytics and insights for the escrow platform",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Analytics</h1>

      <AnalyticsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransactionChart />
        <UserGrowthChart />
      </div>

      <RevenueMetrics />
      <TopPerformers />
    </div>
  )
}

