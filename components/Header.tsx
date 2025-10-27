"use client"
import type React from "react"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <a href="/">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5703aeccc298eaa8457a9dbded23cedecdc22ed?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
                alt="Escrowise Logo"
                className="h-12 w-auto sm:h-16 md:h-20 max-w-[280px]"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden z-10">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-expanded="false"
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
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="/" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              Home
            </a>
            <a href="/how-it-works" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              How It Works
            </a>
            <a href="/features" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              Features
            </a>
            <a href="/services" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              Services
            </a>
            <a href="/pricing" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              Pricing
            </a>
            <a href="/faq" className="text-base tracking-tighter text-black hover:text-orange-400 px-2 py-1">
              FAQ & Help
            </a>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-base tracking-tighter text-black hover:text-orange-400">
              Login
            </a>
            <a
              href="/signup"
              className="text-base tracking-tighter font-bold text-white bg-orange-400 hover:bg-orange-500 transition-colors px-6 py-2 rounded-md"
            >
              Signup
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 mt-16 z-0 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white shadow-lg border-t">
            <a
              href="/"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              Home
            </a>
            <a
              href="/how-it-works"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              How It Works
            </a>
            <a
              href="/features"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              Features
            </a>
            <a
              href="/services"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              Services
            </a>
            <a
              href="/pricing"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              Pricing
            </a>
            <a
              href="/faq"
              className="block px-3 py-2 text-base tracking-tighter text-black hover:bg-orange-100 rounded-md"
            >
              FAQ & Help
            </a>
            <div className="flex space-x-3 px-3 py-4 pt-6">
              <a
                href="/login"
                className="flex-1 text-center text-base tracking-tighter text-black border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="flex-1 text-center text-base tracking-tighter font-bold text-white bg-orange-400 px-4 py-2 rounded-md hover:bg-orange-500 transition-colors"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

