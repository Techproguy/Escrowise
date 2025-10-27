"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, Settings, BarChart2, AlertTriangle, HelpCircle, Menu, X, Database } from "lucide-react"

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 border-r border-gray-200 bg-white flex-col shadow-sm transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5703aeccc298eaa8457a9dbded23cedecdc22ed?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
              alt="Escrowise Logo"
              className="h-8 w-auto"
            />
            <span className="text-sm font-semibold">Admin Dashboard</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </Link>
            <Link
              href="/admin/transactions"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <FileText className="h-5 w-5" />
              <span>Transactions</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/admin/disputes"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Disputes</span>
            </Link>
            <Link
              href="/admin/support"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </Link>
            <Link
              href="/admin/data-management"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Database className="h-5 w-5" />
              <span>Data Management</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-20 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </>
  )
}

