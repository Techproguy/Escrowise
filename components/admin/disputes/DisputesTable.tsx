"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, MessageSquare, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function DisputesTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const disputes = [
    {
      id: "DSP-2023-04-25-001",
      transactionId: "TX-2023-04-21-005",
      buyer: "James Thomas",
      seller: "Isabella Jackson",
      amount: "$1,500.00",
      status: "Open",
      reason: "Service not as described",
      date: "2023-04-25",
    },
    {
      id: "DSP-2023-04-24-002",
      transactionId: "TX-2023-04-16-010",
      buyer: "Joseph Baker",
      seller: "Emily Nelson",
      amount: "$1,200.00",
      status: "Under Review",
      reason: "Delayed delivery",
      date: "2023-04-24",
    },
    {
      id: "DSP-2023-04-22-003",
      transactionId: "TX-2023-04-10-015",
      buyer: "Michael Wilson",
      seller: "Olivia Martinez",
      amount: "$3,200.00",
      status: "Resolved",
      reason: "Payment issue",
      date: "2023-04-22",
    },
    {
      id: "DSP-2023-04-20-004",
      transactionId: "TX-2023-04-05-022",
      buyer: "William Taylor",
      seller: "Sophia Anderson",
      amount: "$950.00",
      status: "Closed",
      reason: "Incomplete work",
      date: "2023-04-20",
    },
    {
      id: "DSP-2023-04-18-005",
      transactionId: "TX-2023-04-02-031",
      buyer: "David White",
      seller: "Ava Harris",
      amount: "$4,800.00",
      status: "Open",
      reason: "Quality issues",
      date: "2023-04-18",
    },
    {
      id: "DSP-2023-04-15-006",
      transactionId: "TX-2023-03-28-042",
      buyer: "Christopher Garcia",
      seller: "Mia Lewis",
      amount: "$2,100.00",
      status: "Under Review",
      reason: "Refund request",
      date: "2023-04-15",
    },
    {
      id: "DSP-2023-04-12-007",
      transactionId: "TX-2023-03-25-051",
      buyer: "Daniel Lee",
      seller: "Chloe Walker",
      amount: "$750.00",
      status: "Resolved",
      reason: "Communication issues",
      date: "2023-04-12",
    },
  ]

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === disputes.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(disputes.map((d) => d.id))
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
      "Under Review": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
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

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === disputes.length && disputes.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[120px]">Dispute ID</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((dispute) => (
              <TableRow key={dispute.id} className="group hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(dispute.id)}
                    onCheckedChange={() => handleSelectRow(dispute.id)}
                    aria-label={`Select row ${dispute.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{dispute.id}</TableCell>
                <TableCell>{dispute.transactionId}</TableCell>
                <TableCell>{dispute.buyer}</TableCell>
                <TableCell>{dispute.seller}</TableCell>
                <TableCell>{dispute.amount}</TableCell>
                <TableCell>
                  <StatusBadge status={dispute.status} />
                </TableCell>
                <TableCell>{dispute.date}</TableCell>
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
                        <span>View details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Send message</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Resolve dispute</span>
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
              {selectedRows.length} of {disputes.length} row(s) selected.
            </span>
          ) : (
            <span>Showing {disputes.length} disputes</span>
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
            disabled={disputes.length <= 10}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

