"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [loginAttempts, setLoginAttempts] = useState("5")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Settings</CardTitle>
          <CardDescription>Configure authentication and security options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Require two-factor authentication for all admin users</p>
            </div>
            <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
            />
            <p className="text-sm text-gray-500">Automatically log out users after period of inactivity</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-expiry">Password Expiry (days)</Label>
            <Input
              id="password-expiry"
              type="number"
              value={passwordExpiry}
              onChange={(e) => setPasswordExpiry(e.target.value)}
            />
            <p className="text-sm text-gray-500">Force password reset after specified number of days</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-attempts">Failed Login Attempts</Label>
            <Input
              id="login-attempts"
              type="number"
              value={loginAttempts}
              onChange={(e) => setLoginAttempts(e.target.value)}
            />
            <p className="text-sm text-gray-500">Number of failed attempts before account lockout</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Security</CardTitle>
          <CardDescription>Configure API access and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="api-access">API Access</Label>
              <p className="text-sm text-gray-500">Enable API access for third-party integrations</p>
            </div>
            <Switch id="api-access" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-restriction">IP Restriction</Label>
              <p className="text-sm text-gray-500">Restrict API access to whitelisted IP addresses</p>
            </div>
            <Switch id="ip-restriction" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

