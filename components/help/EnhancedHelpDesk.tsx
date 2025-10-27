"use client"
import type React from "react"
import { useState } from "react"
import { HelpDeskSidebar } from "./HelpDeskSidebar"
import { HelpDeskFAQList } from "./HelpDeskFAQList"
import { FAQDetail } from "./FAQDetail"
import ContactSupport from "./ContactSupport"
import Header from "@/components/dashboard/Header"
import { Search } from "lucide-react"
import Link from "next/link"

const EnhancedHelpDesk: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Process")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for: ${searchQuery}`)
    // Implement search functionality here
  }

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question)
  }

  const handleBackToFAQs = () => {
    setSelectedQuestion(null)
  }

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
      <Header />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">Help Center</h1>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors shadow-sm"
            >
              Contact Support
            </Link>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-col lg:flex-row gap-8">
            <HelpDeskSidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <div className="flex-1">
              {selectedQuestion ? (
                <FAQDetail question={selectedQuestion} onBack={handleBackToFAQs} />
              ) : (
                <HelpDeskFAQList category={activeCategory} />
              )}

              <ContactSupport />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EnhancedHelpDesk

