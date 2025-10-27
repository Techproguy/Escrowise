"use client"

import React from "react"

import { TrendingUp, Users, ShieldAlert, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/src/supabaseClient"
import { AnimatedCounter } from "@/components/animations/AnimatedCounter"

interface StatCardProps {
  title: string
  value: string | number | React.ReactNode
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  children?: React.ReactNode // Allow children prop for Card compatibility
}

const StatCard = ({ title, value, icon, trend, className, children }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          <div className="bg-gray-100 p-2 rounded-md">{icon}</div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <div className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? (
                <ArrowUpRight className="h-4 w-4 inline-block mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 inline-block mr-1" />
              )}
              <span className="text-sm font-medium">{trend.value}%</span>
            </div>
            <span className="text-xs text-gray-500 ml-1">vs. last month</span>
          </div>
        )}
        {children}
      </CardHeader>
    </Card>
  )
}

export default function DashboardStats() {
  const [stats, setStats] = React.useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const res = await fetch("/api/admin/overview", {
        headers: { "x-admin-id": user.id },
      });
      const json = await res.json();
      setStats(json);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Loading..."
          value={<AnimatedCounter value={0} />}
          icon={<TrendingUp className="h-4 w-4 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pending Escrows"
        value={<AnimatedCounter value={stats.pendingEscrows ?? 0} />}
        icon={<TrendingUp className="h-4 w-4 text-orange-600" />}
      />
      <StatCard
        title="Awaiting Verification"
        value={<AnimatedCounter value={stats.awaitingVerification ?? 0} />}
        icon={<Users className="h-4 w-4 text-blue-600" />}
      />
      <StatCard
        title="Completed This Week"
        value={<AnimatedCounter value={stats.completedWeek ?? 0} />}
        icon={<ShieldAlert className="h-4 w-4 text-red-600" />}
      />
      <StatCard
        title="Revenue (Mo.)"
        value={`$${(stats.revenueMonth ?? 0).toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4 text-green-600" />}
      />
    </div>
  )
}

