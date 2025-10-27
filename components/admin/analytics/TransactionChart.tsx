"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    transactions: 1200,
  },
  {
    name: "Feb",
    transactions: 1800,
  },
  {
    name: "Mar",
    transactions: 2200,
  },
  {
    name: "Apr",
    transactions: 2600,
  },
  {
    name: "May",
    transactions: 3200,
  },
  {
    name: "Jun",
    transactions: 3800,
  },
  {
    name: "Jul",
    transactions: 4200,
  },
  {
    name: "Aug",
    transactions: 4800,
  },
  {
    name: "Sep",
    transactions: 4400,
  },
  {
    name: "Oct",
    transactions: 5200,
  },
  {
    name: "Nov",
    transactions: 5600,
  },
  {
    name: "Dec",
    transactions: 6200,
  },
]

export function TransactionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            transactions: {
              label: "Transactions",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
              <Bar dataKey="transactions" fill="var(--color-transactions)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

