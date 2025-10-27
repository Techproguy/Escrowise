"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    activity: "Transaction TX-1234 was completed",
    timestamp: "Today, 10:30 AM",
    type: "transaction",
  },
  {
    id: 2,
    activity: "New user Emma Wilson registered",
    timestamp: "Today, 9:15 AM",
    type: "user",
  },
  {
    id: 3,
    activity: "Dispute opened for transaction TX-1237",
    timestamp: "Today, 8:45 AM",
    type: "dispute",
  },
  {
    id: 4,
    activity: "System maintenance completed",
    timestamp: "Yesterday, 11:30 PM",
    type: "system",
  },
  {
    id: 5,
    activity: "New support ticket #4352 opened",
    timestamp: "Yesterday, 4:20 PM",
    type: "support",
  },
  {
    id: 6,
    activity: "Transaction TX-1235 status updated to in progress",
    timestamp: "Yesterday, 2:15 PM",
    type: "transaction",
  },
]

const ActivityIcon = ({ type }: { type: string }) => {
  const iconStyles = {
    transaction: "bg-blue-100 text-blue-500",
    user: "bg-green-100 text-green-500",
    dispute: "bg-red-100 text-red-500",
    system: "bg-yellow-100 text-yellow-500",
    support: "bg-purple-100 text-purple-500",
  }

  const style = iconStyles[type as keyof typeof iconStyles] || "bg-gray-100 text-gray-500"

  return <div className={`w-2 h-2 rounded-full ${style}`}></div>
}

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1">
                <ActivityIcon type={activity.type} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.activity}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

