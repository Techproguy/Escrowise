"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { name: "Transaction Fees", value: 42580 },
  { name: "Premium Subscriptions", value: 28240 },
  { name: "API Access", value: 12350 },
  { name: "Dispute Resolution", value: 8120 },
  { name: "Other", value: 3890 },
]

const feesData = [
  { name: "Standard Fee (1%)", value: 28420 },
  { name: "Premium Fee (0.8%)", value: 12840 },
  { name: "Enterprise Fee (0.5%)", value: 8320 },
]

const subscriptionsData = [
  { name: "Basic ($9.99/mo)", value: 8240 },
  { name: "Pro ($19.99/mo)", value: 12480 },
  { name: "Enterprise ($49.99/mo)", value: 7520 },
]

export function RevenueMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ChartContainer
              config={{
                transactionFees: {
                  label: "Transaction Fees",
                  color: "hsl(var(--chart-1))",
                },
                premiumSubscriptions: {
                  label: "Premium Subscriptions",
                  color: "hsl(var(--chart-2))",
                },
                apiAccess: {
                  label: "API Access",
                  color: "hsl(var(--chart-3))",
                },
                disputeResolution: {
                  label: "Dispute Resolution",
                  color: "hsl(var(--chart-4))",
                },
                other: {
                  label: "Other",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueData.map((entry, index) => {
                      const colorKeys = [
                        "transactionFees",
                        "premiumSubscriptions",
                        "apiAccess",
                        "disputeResolution",
                        "other",
                      ]
                      return <Cell key={`cell-${index}`} fill={`var(--color-${colorKeys[index]})`} />
                    })}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="fees">
            <ChartContainer
              config={{
                standardFee: {
                  label: "Standard Fee (1%)",
                  color: "hsl(var(--chart-1))",
                },
                premiumFee: {
                  label: "Premium Fee (0.8%)",
                  color: "hsl(var(--chart-2))",
                },
                enterpriseFee: {
                  label: "Enterprise Fee (0.5%)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {feesData.map((entry, index) => {
                      const colorKeys = ["standardFee", "premiumFee", "enterpriseFee"]
                      return <Cell key={`cell-${index}`} fill={`var(--color-${colorKeys[index]})`} />
                    })}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="subscriptions">
            <ChartContainer
              config={{
                basic: {
                  label: "Basic ($9.99/mo)",
                  color: "hsl(var(--chart-1))",
                },
                pro: {
                  label: "Pro ($19.99/mo)",
                  color: "hsl(var(--chart-2))",
                },
                enterprise: {
                  label: "Enterprise ($49.99/mo)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {subscriptionsData.map((entry, index) => {
                      const colorKeys = ["basic", "pro", "enterprise"]
                      return <Cell key={`cell-${index}`} fill={`var(--color-${colorKeys[index]})`} />
                    })}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

