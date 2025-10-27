"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Edit, Check, X } from "lucide-react"
import { UserDetailsDrawer } from "@/components/admin/UserDetailsDrawer"
import { UserEditModal } from "@/components/admin/UserEditModal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"


import { useEffect } from "react"
import { supabase } from "@/src/supabaseClient"

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string | null;
  verified: boolean;
  joined: string;
  transactions: number;
}

// Fallback placeholder while loading
const initialUsers: UserRow[] = [
  {
    id: "U-1234",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "buyer",
    status: "active",
    verified: true,
    joined: "Apr 2, 2023",
    transactions: 12,
  },
  {
    id: "U-1235",
    name: "James Smith",
    email: "james@example.com",
    role: "seller",
    status: "active",
    verified: true,
    joined: "Apr 1, 2023",
    transactions: 28,
  },
  {
    id: "U-1236",
    name: "Olivia Johnson",
    email: "olivia@example.com",
    role: "buyer",
    status: "inactive",
    verified: false,
    joined: "Mar 30, 2023",
    transactions: 5,
  },
  {
    id: "U-1237",
    name: "William Brown",
    email: "william@example.com",
    role: "seller",
    status: "active",
    verified: true,
    joined: "Mar 28, 2023",
    transactions: 17,
  },
  {
    id: "U-1238",
    name: "Sophia Davis",
    email: "sophia@example.com",
    role: "buyer",
    status: "suspended",
    verified: false,
    joined: "Mar 25, 2023",
    transactions: 3,
  },
  {
    id: "U-1239",
    name: "Noah Wilson",
    email: "noah@example.com",
    role: "both",
    status: "active",
    verified: true,
    joined: "Mar 22, 2023",
    transactions: 9,
  },
  {
    id: "U-1240",
    name: "Isabella Smith",
    email: "isabella@example.com",
    role: "buyer",
    status: "pending",
    verified: false,
    joined: "Mar 20, 2023",
    transactions: 0,
  },
  {
    id: "U-1241",
    name: "Ethan Jones",
    email: "ethan@example.com",
    role: "seller",
    status: "active",
    verified: true,
    joined: "Mar 18, 2023",
    transactions: 21,
  },
  {
    id: "U-1242",
    name: "Mia Brown",
    email: "mia@example.com",
    role: "buyer",
    status: "active",
    verified: false,
    joined: "Mar 15, 2023",
    transactions: 7,
  },
  {
    id: "U-1243",
    name: "Liam Johnson",
    email: "liam@example.com",
    role: "both",
    status: "active",
    verified: true,
    joined: "Mar 12, 2023",
    transactions: 14,
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    suspended: "bg-red-100 text-red-800 hover:bg-red-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  }

  const statusType = status as keyof typeof statusStyles

  return (
    <Badge className={`font-medium ${statusStyles[statusType] || "bg-gray-100 text-gray-800"}`} variant="outline">
      {status}
    </Badge>
  )
}

export function UsersTable() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  

  // Load users from Supabase
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Fetch profiles with basic info
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, role, status, verification_status, created_at')
        .order('created_at', { ascending: false });
      if (!error && data) {
        const mapped: UserRow[] = data.map((p: any) => ({
          id: p.id,
          name: [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email,
          email: p.email,
          role: p.role,
          status: p.status ?? 'active',
          verified: p.verification_status === 'approved' || p.verified === true,
          joined: new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
          transactions: 0,
        }));
        setUsers(mapped);
      }
      setLoading(false);
    };
    load();
  }, []);

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(users.map((u) => u.id))
    }
  }

  // Handle single row checkbox
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setEditModalOpen(true);
  };

  const handleUserUpdated = () => {
    // Reload users after update
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Fetch profiles with basic info
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, role, status, verification_status, created_at')
        .order('created_at', { ascending: false });
      if (!error && data) {
        const mapped: UserRow[] = data.map((p: any) => ({
          id: p.id,
          name: [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email,
          email: p.email,
          role: p.role,
          status: p.status ?? 'active',
          verified: p.verification_status === 'approved' || p.verified === true,
          joined: new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
          transactions: 0,
        }));
        setUsers(mapped);
      }
      setLoading(false);
    };
    load();
  };

  return (
    <>
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedRows.length === users.length && users.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="group hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(user.id)}
                      onCheckedChange={() => handleSelectRow(user.id)}
                      aria-label={`Select row ${user.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status ?? ""} />
                  </TableCell>
                  <TableCell>
                    {user.verified ? (
                      <div className="flex items-center text-green-600">
                        <Check className="mr-1 h-4 w-4" /> Yes
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <X className="mr-1 h-4 w-4" /> No
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{user.transactions}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedUserId(user.id);
                          setDrawerOpen(true);
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit user</span>
                        </DropdownMenuItem>
                        {!user.verified && (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            <span>Verify user</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <UserDetailsDrawer
        userId={selectedUserId}
        open={drawerOpen}
        onOpenChange={(o) => {
          if (!o) setSelectedUserId(null);
          setDrawerOpen(o);
        }}
        onProfileUpdated={() => {
          if (!selectedUserId) return;
          setUsers((prev) => prev.map((u) => (u.id === selectedUserId ? { ...u, verified: true } : u)));
        }}
      />
      
      <UserEditModal
        userId={editingUserId}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onUserUpdated={handleUserUpdated}
      />
      
      {/*
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Information about the selected user.</DialogDescription>
          </DialogHeader>
          {viewUser && (
            <div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={viewUser.name}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={viewUser.email}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={viewUser.role}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <input
                    type="text"
                    id="status"
                    value={viewUser.status}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="verified" className="text-right">
                    Verified
                  </label>
                  <input
                    type="text"
                    id="verified"
                    value={viewUser.verified ? "Yes" : "No"}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="joined" className="text-right">
                    Joined
                  </label>
                  <input
                    type="text"
                    id="joined"
                    value={viewUser.joined}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="transactions" className="text-right">
                    Transactions
                  </label>
                  <input
                    type="text"
                    id="transactions"
                    value={viewUser.transactions}
                    className="col-span-3 rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      */}
    </>
  )
}
