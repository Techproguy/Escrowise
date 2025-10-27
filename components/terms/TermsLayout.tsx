"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TermsContent from "./TermsContent"
import TermsSidebar from "./TermsSidebar"

const TermsLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16 w-full max-w-[1440px] mx-auto">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-8">
            Terms of Service
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4 order-2 lg:order-1">
              <TermsContent />
            </div>
            <div className="w-full lg:w-1/4 order-1 lg:order-2">
              <TermsSidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default TermsLayout

