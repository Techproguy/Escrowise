export interface Integration {
  id: string
  name: string
  description: string
  category: string
  icon: string
  status: "connected" | "disconnected"
}

