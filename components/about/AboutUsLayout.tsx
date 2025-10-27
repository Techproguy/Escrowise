"use client"
import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AboutHero from "./AboutHero"
import OurMission from "./OurMission"
import OurTeam from "./OurTeam"
import OurHistory from "./OurHistory"
import OurValues from "./OurValues"
import Testimonials from "./Testimonials"

const AboutUsLayout: React.FC = () => {
  return (
    <main className="overflow-hidden bg-zinc-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-11 pb-16 w-full max-w-[1440px] mx-auto">
        <AboutHero />
        <OurMission />
        <OurValues />
        <OurHistory />
        <OurTeam />
        <Testimonials />
      </div>
      <Footer />
    </main>
  )
}

export default AboutUsLayout

