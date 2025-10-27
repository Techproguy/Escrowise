"use client"

import { Bell, ChevronDown, Search } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/supabaseClient"

export default function AdminHeader() {
  const router = useRouter()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [profile, setProfile] = useState<{ full_name: string | null; email: string; role: string; avatar_url?: string | null } | null>(null)

  // Load profile of current authenticated user
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, email, role, avatar_url')
        .eq('id', user.id)
        .single()
      if (!error && data) {
        const p = data as any
        setProfile({
          full_name: (p.first_name && p.last_name) ? `${p.first_name} ${p.last_name}` : (p.first_name || p.last_name || null),
          email: p.email,
          role: p.role,
          avatar_url: p.avatar_url,
        })
      }
    }
    loadProfile()
  }, [])

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 focus:outline-none"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                { (profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A').toUpperCase() }
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{profile?.full_name || profile?.email || 'Admin User'}</div>
                {profile?.role ? (<div className="text-xs text-gray-500">{profile.role === 'admin' ? 'Administrator' : profile.role}</div>) : null}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{profile?.full_name || profile?.email || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 truncate">{profile?.email || 'admin@escrowise.com'}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/settings/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    Settings
                  </Link>
                </div>
                <div className="border-t border-gray-200 py-1">
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

