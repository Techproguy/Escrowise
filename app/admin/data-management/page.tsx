import { DataManagement } from "@/components/admin/DataManagement"

export default function DataManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">
          Manage and edit data across all database tables. Use with caution as changes are permanent.
        </p>
      </div>
      
      <DataManagement />
    </div>
  )
}



