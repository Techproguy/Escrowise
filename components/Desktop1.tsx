"use client"
import type React from "react"
import Header from "./Header"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import FeaturesSection from "./FeaturesSection"
import ServicesSection from "./ServicesSection"
import CompanySection from "./CompanySection"
import Footer from "./Footer"

const Desktop1: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-0 w-full max-w-[1440px] mx-auto">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ServicesSection />
        <CompanySection />
      </div>
      <Footer />
    </main>
  )
}

export default Desktop1

