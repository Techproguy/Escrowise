"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 mx-auto h-20 max-w-[1440px]">
        <Link href="/">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5703aeccc298eaa8457a9dbded23cedecdc22ed?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            alt="Escrowise Logo"
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-5 items-center">
          <Link
            href="/transactions"
            className="text-base lg:text-lg font-bold tracking-tighter text-orange-400 hover:text-orange-500 transition-colors"
          >
            My Transactions
          </Link>
          <Link
            href="/integrations"
            className="text-base lg:text-lg tracking-tighter text-black hover:text-orange-400 transition-colors"
          >
            My Integrations
          </Link>
          <Link
            href="/verification"
            className="text-base lg:text-lg tracking-tighter text-black hover:text-orange-400 transition-colors"
          >
            Get Verified
          </Link>
          <Link
            href="/help"
            className="text-base lg:text-lg tracking-tighter text-black hover:text-orange-400 transition-colors"
          >
            Help
          </Link>
          <Link
            href="/contact"
            className="text-base lg:text-lg tracking-tighter text-black hover:text-orange-400 transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex gap-3 sm:gap-5 items-center">
          <Link
            href="/newtransaction"
            className="hidden sm:block px-4 lg:px-8 py-2.5 text-sm lg:text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 rounded-md transition-colors shadow-sm"
          >
            Start New Transaction
          </Link>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 focus:outline-none"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-[#666666] flex items-center justify-center text-white font-bold">
                J
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <hr className="my-1" />
                <Link href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/transactions"
              className="block px-3 py-2 text-base font-medium text-orange-400 hover:bg-orange-100 rounded-md"
            >
              My Transactions
            </Link>
            <Link
              href="/integrations"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              My Integrations
            </Link>
            <Link
              href="/verification"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Get Verified
            </Link>
            <Link
              href="/help"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Help
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Contact Us
            </Link>
            <Link
              href="/newtransaction"
              className="block px-3 py-2 text-base font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-md mt-4"
            >
              Start New Transaction
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

