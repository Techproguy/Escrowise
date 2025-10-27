"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function AnalyticsOverview() {
  return (
    <Tabs defaultValue="week" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <div className="text-sm text-gray-500">Last updated: Apr 5, 2023, 10:30 AM</div>
      </div>

      <TabsContent value="day" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Transactions" value="42" change={{ value: 12, isPositive: true }} period="vs. yesterday" />
          <MetricCard title="Revenue" value="$1,240" change={{ value: 8, isPositive: true }} period="vs. yesterday" />
          <MetricCard title="New Users" value="18" change={{ value: 32, isPositive: true }} period="vs. yesterday" />
          <MetricCard title="Disputes" value="2" change={{ value: 50, isPositive: false }} period="vs. yesterday" />
        </div>
      </TabsContent>

      <TabsContent value="week" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Transactions"
            value="287"
            change={{ value: 18, isPositive: true }}
            period="vs. last week"
          />
          <MetricCard title="Revenue" value="$8,492" change={{ value: 12, isPositive: true }} period="vs. last week" />
          <MetricCard title="New Users" value="94" change={{ value: 24, isPositive: true }} period="vs. last week" />
          <MetricCard title="Disputes" value="8" change={{ value: 14, isPositive: false }} period="vs. last week" />
        </div>
      </TabsContent>

      <TabsContent value="month" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Transactions"
            value="1,243"
            change={{ value: 12, isPositive: true }}
            period="vs. last month"
          />
          <MetricCard
            title="Revenue"
            value="$53,249"
            change={{ value: 15, isPositive: true }}
            period="vs. last month"
          />
          <MetricCard title="New Users" value="528" change={{ value: 8, isPositive: true }} period="vs. last month" />
          <MetricCard title="Disputes" value="15" change={{ value: 2, isPositive: false }} period="vs. last month" />
        </div>
      </TabsContent>

      <TabsContent value="year" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Transactions"
            value="14,287"
            change={{ value: 32, isPositive: true }}
            period="vs. last year"
          />
          <MetricCard
            title="Revenue"
            value="$642,492"
            change={{ value: 28, isPositive: true }}
            period="vs. last year"
          />
          <MetricCard title="New Users" value="5,294" change={{ value: 42, isPositive: true }} period="vs. last year" />
          <MetricCard title="Disputes" value="128" change={{ value: 8, isPositive: false }} period="vs. last year" />
        </div>
      </TabsContent>
    </Tabs>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: {
    value: number
    isPositive: boolean
  }
  period: string
}

function MetricCard({ title, value, change, period }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <div className={change.isPositive ? "text-green-500" : "text-red-500"}>
            {change.isPositive ? (
              <ArrowUpRight className="h-4 w-4 inline-block mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 inline-block mr-1" />
            )}
            <span className="text-sm font-medium">{change.value}%</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">{period}</span>
        </div>
      </CardContent>
    </Card>
  )
}

