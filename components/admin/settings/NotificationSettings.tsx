"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which email notifications are sent to users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transaction-created">Transaction Created</Label>
              <p className="text-sm text-gray-500">Send email when a new transaction is created</p>
            </div>
            <Switch id="transaction-created" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="payment-received">Payment Received</Label>
              <p className="text-sm text-gray-500">Send email when payment is received</p>
            </div>
            <Switch id="payment-received" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transaction-completed">Transaction Completed</Label>
              <p className="text-sm text-gray-500">Send email when a transaction is completed</p>
            </div>
            <Switch id="transaction-completed" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dispute-opened">Dispute Opened</Label>
              <p className="text-sm text-gray-500">Send email when a dispute is opened</p>
            </div>
            <Switch id="dispute-opened" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
          <CardDescription>Configure system-level notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="admin-login">Admin Login Alerts</Label>
              <p className="text-sm text-gray-500">Send notification when admin users log in</p>
            </div>
            <Switch id="admin-login" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="system-updates">System Updates</Label>
              <p className="text-sm text-gray-500">Send notification for system updates and maintenance</p>
            </div>
            <Switch id="system-updates" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-gray-500">Send notification for security-related events</p>
            </div>
            <Switch id="security-alerts" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

