"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, MessageSquare, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function SupportTicketsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const tickets = [
    {
      id: "TKT-1234",
      subject: "Cannot complete transaction",
      user: "Emma Wilson",
      email: "emma@example.com",
      status: "Open",
      priority: "High",
      date: "Apr 25, 2023",
    },
    {
      id: "TKT-1235",
      subject: "Question about fees",
      user: "James Smith",
      email: "james@example.com",
      status: "In Progress",
      priority: "Medium",
      date: "Apr 24, 2023",
    },
    {
      id: "TKT-1236",
      subject: "Verification issue",
      user: "Olivia Johnson",
      email: "olivia@example.com",
      status: "Open",
      priority: "High",
      date: "Apr 23, 2023",
    },
    {
      id: "TKT-1237",
      subject: "Payment not showing up",
      user: "William Brown",
      email: "william@example.com",
      status: "In Progress",
      priority: "Medium",
      date: "Apr 22, 2023",
    },
    {
      id: "TKT-1238",
      subject: "How to cancel transaction",
      user: "Sophia Davis",
      email: "sophia@example.com",
      status: "Resolved",
      priority: "Low",
      date: "Apr 21, 2023",
    },
    {
      id: "TKT-1239",
      subject: "Account access problem",
      user: "Noah Wilson",
      email: "noah@example.com",
      status: "Open",
      priority: "High",
      date: "Apr 20, 2023",
    },
    {
      id: "TKT-1240",
      subject: "Refund request",
      user: "Isabella Smith",
      email: "isabella@example.com",
      status: "Closed",
      priority: "Medium",
      date: "Apr 19, 2023",
    },
  ]

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === tickets.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(tickets.map((t) => t.id))
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

  const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles = {
      Open: "bg-red-100 text-red-800 hover:bg-red-200",
      "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Resolved: "bg-green-100 text-green-800 hover:bg-green-200",
      Closed: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }

    const statusType = status as keyof typeof statusStyles

    return (
      <Badge className={`font-medium ${statusStyles[statusType] || "bg-gray-100 text-gray-800"}`} variant="outline">
        {status}
      </Badge>
    )
  }

  const PriorityBadge = ({ priority }: { priority: string }) => {
    const priorityStyles = {
      High: "bg-red-100 text-red-800 hover:bg-red-200",
      Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      Low: "bg-green-100 text-green-800 hover:bg-green-200",
    }

    const priorityType = priority as keyof typeof priorityStyles

    return (
      <Badge className={`font-medium ${priorityStyles[priorityType] || "bg-gray-100 text-gray-800"}`} variant="outline">
        {priority}
      </Badge>
    )
  }

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === tickets.length && tickets.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="group hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(ticket.id)}
                    onCheckedChange={() => handleSelectRow(ticket.id)}
                    aria-label={`Select row ${ticket.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{ticket.user}</div>
                    <div className="text-xs text-gray-500">{ticket.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View ticket</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Reply</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Mark as resolved</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4 px-4">
        <div className="text-sm text-gray-500">
          {selectedRows.length > 0 ? (
            <span>
              {selectedRows.length} of {tickets.length} row(s) selected.
            </span>
          ) : (
            <span>Showing {tickets.length} tickets</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="px-3 py-2 h-8">
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={tickets.length <= 10}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

