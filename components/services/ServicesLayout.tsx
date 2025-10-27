"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServicesHero from "./ServicesHero"
import ServiceCategories from "./ServiceCategories"
import ServiceDetails from "./ServiceDetails"
import ServiceComparison from "./ServiceComparison"
import ServiceCTA from "./ServiceCTA"
import IndustrySpecific from "./IndustrySpecific"

const ServicesLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16 w-full max-w-[1440px] mx-auto">
        <ServicesHero />
        <ServiceCategories />
        <ServiceDetails />
        <IndustrySpecific />
        <ServiceComparison />
        <ServiceCTA />
      </div>
      <Footer />
    </main>
  )
}

export default ServicesLayout

