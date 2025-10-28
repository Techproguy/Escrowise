"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Loader2, Database, Edit, Trash2, Plus, Search, AlertTriangle, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TableData {
  [key: string]: any
}

interface TableSchema {
  table_name: string
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
}

export function DataManagement() {
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [tableData, setTableData] = useState<TableData[]>([])
  const [tableSchema, setTableSchema] = useState<TableSchema[]>([])
  const [loading, setLoading] = useState(false)
  const [editingRow, setEditingRow] = useState<TableData | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Available tables for editing (excluding system tables)
  const editableTables = [
    "profiles",
    "transactions", 
    "escrow_transactions",
    "disputes",
    "audit_logs",
    "verification_queue"
  ]

  useEffect(() => {
    loadTables()
  }, [])

  useEffect(() => {
    if (selectedTable) {
      loadTableData()
      loadTableSchema()
    }
  }, [selectedTable])

  const loadTables = async () => {
    setTables(editableTables)
  }

  const loadTableData = async () => {
    if (!selectedTable) return

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/data/${selectedTable}`, {
        headers: { "x-admin-id": user.id }
      })

      if (!response.ok) {
        throw new Error("Failed to load table data")
      }

      const data = await response.json()
      setTableData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const loadTableSchema = async () => {
    if (!selectedTable) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/data/${selectedTable}/schema`, {
        headers: { "x-admin-id": user.id }
      })

      if (response.ok) {
        const schema = await response.json()
        setTableSchema(schema)
      }
    } catch (err) {
      console.error("Failed to load schema:", err)
    }
  }

  const handleEditRow = (row: TableData) => {
    setEditingRow({ ...row })
    setEditModalOpen(true)
  }

  const handleSaveRow = async () => {
    if (!editingRow || !selectedTable) return

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/data/${selectedTable}/${editingRow.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-id": user.id
        },
        body: JSON.stringify(editingRow)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update row")
      }

      toast({
        title: "Row Updated",
        description: "Data has been successfully updated.",
      })

      setEditModalOpen(false)
      setEditingRow(null)
      loadTableData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update row")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRow = async (id: string) => {
    if (!confirm("Are you sure you want to delete this row? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/data/${selectedTable}/${id}`, {
        method: "DELETE",
        headers: { "x-admin-id": user.id }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete row")
      }

      toast({
        title: "Row Deleted",
        description: "Data has been successfully deleted.",
      })

      loadTableData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete row")
    } finally {
      setLoading(false)
    }
  }

  const filteredData = tableData.filter(row => {
    if (!searchQuery) return true
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const getColumnType = (columnName: string) => {
    const column = tableSchema.find(col => col.column_name === columnName)
    return column?.data_type || "text"
  }

  const formatValue = (value: any, columnName: string) => {
    if (value === null || value === undefined) return "—"
    
    const type = getColumnType(columnName)
    
    if (type.includes("timestamp") || type.includes("date")) {
      return new Date(value).toLocaleString()
    }
    
    if (type.includes("json")) {
      return JSON.stringify(value, null, 2)
    }
    
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }
    
    return String(value)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="table-select">Select Table</Label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a table to manage" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTable && (
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search data..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={loadTableData} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Database className="mr-2 h-4 w-4" />
                  )}
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTable && (
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTable} ({filteredData.length} rows)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tableData.length > 0 && Object.keys(tableData[0]).map((column) => (
                        <TableHead key={column} className="min-w-[120px]">
                          {column}
                        </TableHead>
                      ))}
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row, index) => (
                      <TableRow key={row.id || index}>
                        {Object.entries(row).map(([column, value]) => (
                          <TableCell key={column} className="max-w-[200px] truncate">
                            <div className="truncate" title={formatValue(value, column)}>
                              {formatValue(value, column)}
                            </div>
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRow(row)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRow(row.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Row</DialogTitle>
          </DialogHeader>

          {editingRow && (
            <div className="space-y-4">
              {Object.entries(editingRow).map(([column, value]) => {
                const columnInfo = tableSchema.find(col => col.column_name === column)
                const isEditable = column !== "id" && column !== "created_at" && column !== "updated_at"
                
                if (!isEditable) {
                  return (
                    <div key={column}>
                      <Label className="text-sm text-gray-600">{column}</Label>
                      <Input
                        value={formatValue(value, column)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  )
                }

                const type = getColumnType(column)
                
                if (type.includes("text") || type.includes("varchar")) {
                  return (
                    <div key={column}>
                      <Label htmlFor={column}>{column}</Label>
                      <Textarea
                        id={column}
                        value={value || ""}
                        onChange={(e) => setEditingRow(prev => prev ? { ...prev, [column]: e.target.value } : null)}
                        rows={3}
                      />
                    </div>
                  )
                }

                if (type.includes("boolean")) {
                  return (
                    <div key={column}>
                      <Label htmlFor={column}>{column}</Label>
                      <Select
                        value={String(value)}
                        onValueChange={(val) => setEditingRow(prev => prev ? { ...prev, [column]: val === "true" } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )
                }

                return (
                  <div key={column}>
                    <Label htmlFor={column}>{column}</Label>
                    <Input
                      id={column}
                      type={type.includes("int") || type.includes("numeric") ? "number" : "text"}
                      value={value || ""}
                      onChange={(e) => setEditingRow(prev => prev ? { ...prev, [column]: e.target.value } : null)}
                    />
                  </div>
                )
              })}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              disabled={loading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSaveRow}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}



