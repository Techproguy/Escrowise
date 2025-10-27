import type { Metadata } from "next"
import { SupportHeader } from "@/components/admin/support/SupportHeader"
import { SupportTicketsTable } from "@/components/admin/support/SupportTicketsTable"

export const metadata: Metadata = {
  title: "Support Tickets - Admin Dashboard",
  description: "Manage customer support tickets on the escrow platform",
}

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Support Tickets</h1>

      <SupportHeader />
      <SupportTicketsTable />
    </div>
  )
}

