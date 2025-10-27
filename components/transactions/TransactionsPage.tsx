"use client"

import type React from "react"
import { useState, useEffect } from "react"
import TransactionTabs from "./TransactionTabs"
import TransactionSearch from "./TransactionSearch"
import TransactionTable from "./TransactionTable"
import type { Transaction } from "./types"
import Header from "@/components/dashboard/Header"
import Link from "next/link"
import { Plus } from "lucide-react"
import { supabase } from '../../src/supabaseClient';

const TransactionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)
      try {
        // You may want to filter by user here
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        // Map DB fields to Transaction type expected by UI
        // Get current user id
        const user = await supabase.auth.getUser();
        const userId = user?.data?.user?.id;
        const mapped = (data || []).map((t: any) => {
          let role = '';
          if (userId) {
            if (t.buyer_id === userId) role = 'Buyer';
            else if (t.seller_id === userId) role = 'Seller';
            else role = t.role || '';
          } else {
            role = t.role || '';
          }
          return {
            id: t.id,
            title: t.title,
            created: t.created_at ? new Date(t.created_at).toLocaleDateString() : '',
            amount: t.amount ? `$${parseFloat(t.amount).toFixed(2)}` : '',
            currency: t.currency || '',
            role,
            status: {
              type: t.status || 'awaiting-response',
              text: t.status
                ? t.status.charAt(0).toUpperCase() + t.status.slice(1).replace('-', ' ')
                : 'Awaiting response',
            },
          };
        });
        setTransactions(mapped)
      } catch (err: any) {
        setError(err.message || 'Error loading transactions')
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) || transaction.id.includes(searchQuery)

    if (activeTab === "all") return matchesSearch
    if (activeTab === "action-required") {
      return (
        matchesSearch &&
        (transaction.status.type === "awaiting-response" || transaction.status.type === "awaiting-payment")
      )
    }
    if (activeTab === "open") {
      return (
        matchesSearch &&
        (transaction.status.type === "awaiting-response" || transaction.status.type === "awaiting-payment")
      )
    }
    if (activeTab === "closed") {
      return matchesSearch && (transaction.status.type === "completed" || transaction.status.type === "cancelled")
    }

    return matchesSearch
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = () => {
    // Implement filter functionality
    console.log("Filter button clicked")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">Loading transactions...</div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">{error}</div>
    )
  }

  return (
    <main className="flex flex-col bg-zinc-100 min-h-screen">
      <Header />
      <section className="px-4 sm:px-8 lg:px-16 py-6 sm:py-10 mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-black">My Transactions</h1>
          <Link
            href="/newtransaction"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </Link>
        </div>

        <TransactionTabs onTabChange={handleTabChange} />

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <TransactionSearch
            onSearch={handleSearch}
            onFilter={handleFilter}
            totalTransactions={transactions.length}
            visibleTransactions={filteredTransactions.length}
          />

          <TransactionTable transactions={filteredTransactions} />
        </div>
      </section>
    </main>
  )
}


export default TransactionsPage

