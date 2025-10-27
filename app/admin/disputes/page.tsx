import type { Metadata } from "next"
import { DisputesHeader } from "@/components/admin/disputes/DisputesHeader"
import { DisputesTable } from "@/components/admin/disputes/DisputesTable"

export const metadata: Metadata = {
  title: "Disputes - Admin Dashboard",
  description: "Manage transaction disputes on the escrow platform",
}

export default function DisputesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Dispute Management</h1>

      <DisputesHeader />
      <DisputesTable />
    </div>
  )
}

