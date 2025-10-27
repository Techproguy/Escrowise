"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/src/supabaseClient"
import { ChevronLeft, ChevronRight, MoreHorizontal, Eye, Edit, Trash2, Search, Download, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TransactionEditModal } from "./TransactionEditModal"

export default function TransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [transactions, setTransactions] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const url = new URL('/api/admin/transactions', window.location.origin);
      if (statusFilter && statusFilter !== 'all') url.searchParams.append('status', statusFilter);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', ITEMS_PER_PAGE.toString());

      const res = await fetch(url.toString(), {
        headers: { "x-admin-id": user.id },
      });
      
      if (res.ok) {
        const { data, total } = await res.json();
        setTransactions(data);
        setTotalCount(total);
      }
      setIsLoading(false);
    };

    load();
  }, [statusFilter, searchQuery, currentPage]);

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === transactions.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(transactions.map((t) => t.id))
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
      Completed: "bg-green-100 text-green-800 hover:bg-green-200",
      "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      Disputed: "bg-red-100 text-red-800 hover:bg-red-200",
      Canceled: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }

    const statusType = status as keyof typeof statusStyles

    return (
      <Badge className={`font-medium ${statusStyles[statusType] || "bg-gray-100 text-gray-800"}`} variant="outline">
        {status}
      </Badge>
    )
  }

  const handleExport = async (format: 'csv' | 'json') => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const url = new URL('/api/admin/transactions/export', window.location.origin);
      if (statusFilter && statusFilter !== 'all') url.searchParams.append('status', statusFilter);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      url.searchParams.append('format', format);

      const res = await fetch(url.toString(), {
        headers: { "x-admin-id": user.id },
      });
      
      if (!res.ok) throw new Error('Export failed');
      
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `transactions-${new Date().toISOString()}.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleEditTransaction = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setEditModalOpen(true);
  };

  const handleTransactionUpdated = () => {
    // Reload transactions after update
    const load = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const url = new URL('/api/admin/transactions', window.location.origin);
      if (statusFilter && statusFilter !== 'all') url.searchParams.append('status', statusFilter);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', ITEMS_PER_PAGE.toString());

      const res = await fetch(url.toString(), {
        headers: { "x-admin-id": user.id },
      });
      
      if (res.ok) {
        const { data, total } = await res.json();
        setTransactions(data);
        setTotalCount(total);
      }
      setIsLoading(false);
    };

    load();
  };

  return (
    <Card>
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => {
              setStatusFilter('all');
              setSearchQuery("");
              setCurrentPage(1);
            }}
          >
            Reset
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileText className="h-4 w-4 mr-2" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <FileText className="h-4 w-4 mr-2" />
                JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === transactions.length && transactions.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[150px]">Transaction ID</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="group hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(transaction.id)}
                    onCheckedChange={() => handleSelectRow(transaction.id)}
                    aria-label={`Select row ${transaction.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.buyer}</TableCell>
                <TableCell>{transaction.seller}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditTransaction(transaction.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit transaction</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 hover:text-red-700 focus:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete transaction</span>
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
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="px-3 py-2 h-8" disabled>
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage * ITEMS_PER_PAGE >= totalCount || isLoading}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TransactionEditModal
        transactionId={selectedTransactionId}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onTransactionUpdated={handleTransactionUpdated}
      />
    </Card>
  )
}
