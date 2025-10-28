"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, X, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TransactionEditModalProps {
  transactionId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onTransactionUpdated: () => void
}

interface TransactionData {
  id: string
  amount: number
  description: string
  status: string
  buyer_id: string
  seller_id: string
  created_at: string
  updated_at: string
  buyer?: {
    full_name: string
    email: string
  }
  seller?: {
    full_name: string
    email: string
  }
  [key: string]: any
}

export function TransactionEditModal({ 
  transactionId, 
  open, 
  onOpenChange, 
  onTransactionUpdated 
}: TransactionEditModalProps) {
  const [transaction, setTransaction] = useState<TransactionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Editable fields
  const [editedData, setEditedData] = useState<Partial<TransactionData>>({})

  useEffect(() => {
    if (transactionId && open) {
      loadTransaction()
    }
  }, [transactionId, open])

  const loadTransaction = async () => {
    if (!transactionId) return

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        headers: { "x-admin-id": user.id }
      })

      if (!response.ok) {
        throw new Error("Failed to load transaction")
      }

      const transactionData = await response.json()
      setTransaction(transactionData)
      setEditedData(transactionData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load transaction")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!transaction || !transactionId) return

    setSaving(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-id": user.id
        },
        body: JSON.stringify(editedData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update transaction")
      }

      const updatedTransaction = await response.json()
      setTransaction(updatedTransaction)
      
      toast({
        title: "Transaction Updated",
        description: "Transaction has been successfully updated.",
      })

      onTransactionUpdated()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update transaction")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = async () => {
    if (!transaction || !transactionId) return

    if (!confirm("Are you sure you want to cancel this transaction? This action cannot be undone.")) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: "DELETE",
        headers: { "x-admin-id": user.id }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to cancel transaction")
      }

      toast({
        title: "Transaction Cancelled",
        description: "Transaction has been successfully cancelled.",
      })

      onTransactionUpdated()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel transaction")
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      disputed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800"
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Transaction
            {transaction && (
              <Badge className={getStatusColor(transaction.status)}>
                {transaction.status}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-600 py-4">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        ) : transaction ? (
          <div className="space-y-6">
            {/* Transaction Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="id">Transaction ID</Label>
                    <Input
                      id="id"
                      value={transaction.id}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={editedData.amount || transaction.amount}
                      onChange={(e) => handleFieldChange("amount", parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedData.description || transaction.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedData.status || transaction.status}
                    onValueChange={(value) => handleFieldChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="disputed">Disputed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Parties Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Parties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Buyer</h4>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm text-gray-600">Name</Label>
                        <p className="text-sm">{transaction.buyer?.full_name || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Email</Label>
                        <p className="text-sm">{transaction.buyer?.email || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">ID</Label>
                        <Input
                          value={editedData.buyer_id || transaction.buyer_id}
                          onChange={(e) => handleFieldChange("buyer_id", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Seller</h4>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm text-gray-600">Name</Label>
                        <p className="text-sm">{transaction.seller?.full_name || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Email</Label>
                        <p className="text-sm">{transaction.seller?.email || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">ID</Label>
                        <Input
                          value={editedData.seller_id || transaction.seller_id}
                          onChange={(e) => handleFieldChange("seller_id", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Created At</Label>
                    <p className="text-sm">{new Date(transaction.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Last Updated</Label>
                    <p className="text-sm">{new Date(transaction.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          
          {transaction && transaction.status !== "completed" && (
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Cancel Transaction
            </Button>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



