"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Processors</CardTitle>
          <CardDescription>Configure payment processing services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-processor">Default Payment Processor</Label>
            <Select defaultValue="stripe">
              <SelectTrigger id="default-processor">
                <SelectValue placeholder="Select payment processor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="wise">Wise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Stripe Configuration</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-public-key">Public Key</Label>
                <Input id="stripe-public-key" defaultValue={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret-key">Secret Key</Label>
                <Input id="stripe-secret-key" type="password" defaultValue={process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                <Input
                  id="stripe-webhook-secret"
                  type="password"
                  defaultValue={process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET || ""}
                />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>PayPal Configuration</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input id="paypal-client-id" defaultValue="AeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-secret">Secret</Label>
                <Input id="paypal-secret" type="password" defaultValue="EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees</CardTitle>
          <CardDescription>Configure platform transaction fees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="standard-fee">Standard Fee (%)</Label>
            <Input id="standard-fee" type="number" defaultValue="2.5" />
            <p className="text-sm text-gray-500">Standard fee applied to all transactions</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum-fee">Minimum Fee ($)</Label>
            <Input id="minimum-fee" type="number" defaultValue="1.00" />
            <p className="text-sm text-gray-500">Minimum fee applied to small transactions</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="high-value-fee">High Value Fee (%)</Label>
            <Input id="high-value-fee" type="number" defaultValue="1.8" />
            <p className="text-sm text-gray-500">Fee applied to transactions over $10,000</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

