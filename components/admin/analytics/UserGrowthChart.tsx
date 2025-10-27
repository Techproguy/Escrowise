"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    newUsers: 120,
    activeUsers: 450,
  },
  {
    name: "Feb",
    newUsers: 240,
    activeUsers: 520,
  },
  {
    name: "Mar",
    newUsers: 380,
    activeUsers: 610,
  },
  {
    name: "Apr",
    newUsers: 520,
    activeUsers: 680,
  },
  {
    name: "May",
    newUsers: 680,
    activeUsers: 780,
  },
  {
    name: "Jun",
    newUsers: 820,
    activeUsers: 920,
  },
  {
    name: "Jul",
    newUsers: 950,
    activeUsers: 1050,
  },
  {
    name: "Aug",
    newUsers: 1100,
    activeUsers: 1180,
  },
  {
    name: "Sep",
    newUsers: 1250,
    activeUsers: 1320,
  },
  {
    name: "Oct",
    newUsers: 1380,
    activeUsers: 1450,
  },
  {
    name: "Nov",
    newUsers: 1520,
    activeUsers: 1580,
  },
  {
    name: "Dec",
    newUsers: 1680,
    activeUsers: 1720,
  },
]

export function UserGrowthChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            newUsers: {
              label: "New Users",
              color: "hsl(var(--chart-2))",
            },
            activeUsers: {
              label: "Active Users",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="var(--color-newUsers)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="var(--color-activeUsers)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Buyers</p>
            <p className="text-xl font-bold text-orange-600">42%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sellers</p>
            <p className="text-xl font-bold text-purple-600">38%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Both</p>
            <p className="text-xl font-bold text-teal-600">20%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

