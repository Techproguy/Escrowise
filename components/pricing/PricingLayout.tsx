"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PricingHeader from "./PricingHeader"
import PricingTiers from "./PricingTiers"
import TestimonialsSection from "./TestimonialsSection"

const PricingLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16">
        <PricingHeader />
        <div className="w-full mt-12 sm:mt-16 lg:mt-20">
          <PricingTiers />
          <TestimonialsSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default PricingLayout

