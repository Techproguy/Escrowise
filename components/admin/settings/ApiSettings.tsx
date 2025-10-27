"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function ApiSettings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "")
  const [webhookUrl, setWebhookUrl] = useState("https://example.com/webhook")
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.1\n10.0.0.1")

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }

  const regenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey("sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Live API Key</Label>
            <div className="flex">
              <div className="relative flex-1">
                <Input id="api-key" type={showApiKey ? "text" : "password"} value={apiKey} readOnly className="pr-20" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button variant="ghost" size="sm" onClick={toggleApiKeyVisibility} className="h-8 w-8 p-0">
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showApiKey ? "Hide API key" : "Show API key"}</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(apiKey)} className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy API key</span>
                  </Button>
                </div>
              </div>
              <Button variant="outline" onClick={regenerateApiKey} className="ml-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <p className="text-sm text-gray-500">Your API key provides full access to your account. Keep it secure!</p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
            <p className="text-sm text-gray-500">URL where webhook notifications will be sent</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ip-whitelist">IP Whitelist</Label>
            <Textarea
              id="ip-whitelist"
              value={ipWhitelist}
              onChange={(e) => setIpWhitelist(e.target.value)}
              placeholder="Enter IP addresses, one per line"
              rows={4}
            />
            <p className="text-sm text-gray-500">Only requests from these IP addresses will be allowed</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Access resources to help integrate with our API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <h3 className="font-medium">API Reference</h3>
                <p className="text-sm text-gray-500">Complete documentation of all API endpoints</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <h3 className="font-medium">SDK Libraries</h3>
                <p className="text-sm text-gray-500">Client libraries for various programming languages</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <h3 className="font-medium">Webhook Guide</h3>
                <p className="text-sm text-gray-500">Learn how to set up and use webhooks</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <h3 className="font-medium">Code Examples</h3>
                <p className="text-sm text-gray-500">Sample code for common API operations</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

