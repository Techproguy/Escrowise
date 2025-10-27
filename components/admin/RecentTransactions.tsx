"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Define transaction type based on your Supabase schema
type Transaction = {
  id: string
  transaction_id: string
  title: string
  amount: number
  status: string
  created_at: string
  buyer_id?: string
  seller_id?: string
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 hover:bg-green-200",
    "in progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    disputed: "bg-red-100 text-red-800 hover:bg-red-200",
  }

  const statusType = status as keyof typeof statusStyles

  return (
    <Badge className={`font-medium ${statusStyles[statusType] || "bg-gray-100 text-gray-800"}`} variant="outline">
      {status}
    </Badge>
  )
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Initial fetch of transactions
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data, error } = await supabase
          .from('transactions')
          .select('id, transaction_id, title, amount, status, created_at, buyer_id, seller_id')
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) {
          console.error('Supabase error details:', error.message, error.details || 'No details', error.hint || 'No hint', error.code || 'No code')
          setError(`Failed to load transactions: ${error.message}`)
          throw error
        }
        if (data) {
          setTransactions(data)
        }
      } catch (err) {
        console.error('Error fetching transactions (full error):', err)
        if (err instanceof Error) {
          setError(`Failed to load transactions: ${err.message}`)
        } else {
          setError('Failed to load transactions: Unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()

    // Setup real-time subscription
    const subscription = supabase
      .channel('transactions:changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions'
      }, (payload) => {
        console.log('Transaction change detected:', payload)
        // Fetch updated transactions on any change
        fetchTransactions()
      })
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to transactions changes')
        } else if (status === 'CLOSED') {
          console.log('Subscription to transactions closed')
        } else if (err) {
          console.error('Subscription error:', err)
          setError(`Real-time updates failed: ${err.message}`)
        }
      })

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription)
      console.log('Unsubscribed from transactions changes')
    }
  }, [supabase])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Format amount for display
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          <Link href="/admin/transactions" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading transactions...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          <Link href="/admin/transactions" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-600">{error}</div>
          <div className="text-center">
            <button 
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              onClick={() => {
                setLoading(true)
                setError(null)
                // Trigger a reload by resetting the transactions
                setTransactions([])
                // Fetch will be triggered by useEffect
              }}
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
        <Link href="/admin/transactions" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="hidden sm:grid grid-cols-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div>ID</div>
            <div className="col-span-2">Transaction</div>
            <div>Amount</div>
            <div>Status</div>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No transactions found.</div>
          ) : (
            transactions.map((transaction) => (
              <Link
                href={`/admin/transactions/${transaction.id}`}
                key={transaction.id}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2 py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm text-gray-500">{transaction.transaction_id || transaction.id}</div>
                <div className="col-span-2 hidden sm:block">
                  <div className="font-medium">{transaction.title}</div>
                  <div className="text-xs text-gray-500">{formatDate(transaction.created_at)}</div>
                </div>
                <div className="sm:hidden">
                  <div className="font-medium">{transaction.title}</div>
                  <div className="text-xs text-gray-500">{formatDate(transaction.created_at)}</div>
                </div>
                <div className="font-medium">{formatAmount(transaction.amount)}</div>
                <div className="flex items-center justify-between">
                  <StatusBadge status={transaction.status} />
                  <ChevronRight className="h-4 w-4 text-gray-400 sm:ml-2" />
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
