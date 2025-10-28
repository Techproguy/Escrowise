"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/src/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, X, AlertTriangle, User, Shield, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserEditModalProps {
  userId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserUpdated: () => void
}

interface UserData {
  id: string
  full_name: string | null
  email: string
  role: string
  status?: string
  verification_status?: string
  created_at: string
  updated_at: string
  transactions?: any[]
  [key: string]: any
}

export function UserEditModal({ 
  userId, 
  open, 
  onOpenChange, 
  onUserUpdated 
}: UserEditModalProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Editable fields
  const [editedData, setEditedData] = useState<Partial<UserData>>({})

  useEffect(() => {
    if (userId && open) {
      loadUser()
    }
  }, [userId, open])

  const loadUser = async () => {
    if (!userId) return

    setLoading(true)
    setError(null)

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) return

      const response = await fetch(`/api/admin/users/${userId}`, {
        headers: { "x-admin-id": currentUser.id }
      })

      if (!response.ok) {
        throw new Error("Failed to load user")
      }

      const userData = await response.json()
      setUser(userData)
      setEditedData(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user || !userId) return

    setSaving(true)
    setError(null)

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) return

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-id": currentUser.id
        },
        body: JSON.stringify(editedData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update user")
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      
      toast({
        title: "User Updated",
        description: "User has been successfully updated.",
      })

      onUserUpdated()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
    } finally {
      setSaving(false)
    }
  }

  const handleDeactivate = async () => {
    if (!user || !userId) return

    if (!confirm("Are you sure you want to deactivate this user? They will not be able to access the platform.")) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) return

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { "x-admin-id": currentUser.id }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to deactivate user")
      }

      toast({
        title: "User Deactivated",
        description: "User has been successfully deactivated.",
      })

      onUserUpdated()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to deactivate user")
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
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      user: "bg-blue-100 text-blue-800",
      moderator: "bg-orange-100 text-orange-800"
    }
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit User
            {user && (
              <div className="flex gap-2">
                <Badge className={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
                {user.status && (
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                )}
              </div>
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
        ) : user ? (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="id">User ID</Label>
                      <Input
                        id="id"
                        value={user.id}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedData.email || user.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={editedData.full_name || user.full_name || ""}
                      onChange={(e) => handleFieldChange("full_name", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={editedData.role || user.role}
                        onValueChange={(value) => handleFieldChange("role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={editedData.status || user.status || "active"}
                        onValueChange={(value) => handleFieldChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="verification_status">Verification Status</Label>
                    <Select
                      value={editedData.verification_status || user.verification_status || "pending"}
                      onValueChange={(value) => handleFieldChange("verification_status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      User permissions are determined by their role. 
                      Admins have full access, moderators have limited admin access, 
                      and users have standard platform access.
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Create Transactions</div>
                          <div className="text-sm text-gray-600">Ability to create new escrow transactions</div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Allowed
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Manage Disputes</div>
                          <div className="text-sm text-gray-600">Ability to resolve transaction disputes</div>
                        </div>
                        <Badge variant="outline" className={user.role === "admin" || user.role === "moderator" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}>
                          {user.role === "admin" || user.role === "moderator" ? "Allowed" : "Denied"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Admin Access</div>
                          <div className="text-sm text-gray-600">Access to admin dashboard and controls</div>
                        </div>
                        <Badge variant="outline" className={user.role === "admin" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}>
                          {user.role === "admin" ? "Allowed" : "Denied"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Account Created</Label>
                        <p className="text-sm">{new Date(user.created_at).toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Last Updated</Label>
                        <p className="text-sm">{new Date(user.updated_at).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600">Total Transactions</Label>
                      <p className="text-sm">{user.transactions?.length || 0}</p>
                    </div>

                    {user.transactions && user.transactions.length > 0 && (
                      <div>
                        <Label className="text-sm text-gray-600">Recent Transactions</Label>
                        <div className="mt-2 space-y-2">
                          {user.transactions.slice(0, 3).map((transaction: any) => (
                            <div key={transaction.id} className="flex items-center justify-between p-2 border rounded text-sm">
                              <span>{transaction.id}</span>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
          
          {user && user.role !== "admin" && (
            <Button
              variant="destructive"
              onClick={handleDeactivate}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Deactivate User
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



