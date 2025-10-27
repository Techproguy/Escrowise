"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HowItWorksHero from "./HowItWorksHero"
import ProcessSteps from "./ProcessSteps"
import EscrowExplained from "./EscrowExplained"
import BenefitsSection from "./BenefitsSection"
import FAQSection from "./FAQSection"
import CTASection from "./CTASection"

const HowItWorksLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16 w-full max-w-[1440px] mx-auto">
        <HowItWorksHero />
        <ProcessSteps />
        <EscrowExplained />
        <BenefitsSection />
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}

export default HowItWorksLayout

