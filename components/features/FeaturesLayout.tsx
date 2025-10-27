"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FeatureHero from "./FeatureHero"
import CoreFeatures from "./CoreFeatures"
import SecurityFeatures from "./SecurityFeatures"
import FeatureShowcase from "./FeatureShowcase"
import FeatureComparison from "./FeatureComparison"
import FeatureTestimonials from "./FeatureTestimonials"
import FeatureCTA from "./FeatureCTA"

const FeaturesLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16 w-full max-w-[1440px] mx-auto">
        <FeatureHero />
        <CoreFeatures />
        <SecurityFeatures />
        <FeatureShowcase />
        <FeatureComparison />
        <FeatureTestimonials />
        <FeatureCTA />
      </div>
      <Footer />
    </main>
  )
}

export default FeaturesLayout

