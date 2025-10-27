import type React from "react"
import { Play } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "./animations/FadeIn"

const HeroSection: React.FC = () => {
  return (
    <div
      className="px-[30px] w-full rounded-[20px] sm:rounded-[30px] overflow-hidden"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%201-GQ5KZnnaHNXyqwpt8B1aoE3pjrLLgY.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="w-full max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-[30px] relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between relative z-10">
          <div className="w-full lg:w-[58%] space-y-5 sm:space-y-7 flex flex-col">
            <FadeIn direction="up" duration={800}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                <span className="text-orange-400">Secure</span> Your Transactions with Confidence
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={200} duration={800}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-800 max-w-xl">
                Escrow solutions designed to protect your business deals and ensure safe payments.
              </p>
            </FadeIn>
            <div className="flex flex-row items-center gap-6 sm:gap-10 pt-4 sm:pt-6">
              <FadeIn direction="up" delay={400} duration={800}>
                <Link href="/signup" className="px-6 sm:px-10 py-3 sm:py-4 text-base font-semibold text-white bg-orange-400 hover:bg-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-md shadow-sm">
                  Get Started
                </Link>
              </FadeIn>
              <FadeIn direction="up" delay={600} duration={800}>
                <button className="flex items-center gap-3 text-base sm:text-lg text-gray-800 hover:text-black group transition-colors duration-300">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 text-white group-hover:scale-110 transition-transform">
                    <Play size={16} className="ml-0.5" />
                  </div>
                  Watch user guide
                </button>
              </FadeIn>
            </div>
          </div>
          <FadeIn direction="left" delay={300} duration={1000} className="w-full lg:w-[38%] mt-6 lg:mt-0">
            <div className="animate-float">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2013%20%281%29-J6D3pOTttXYmiRmixHOsE11bodGO1D.png"
                alt="Secure transactions illustration"
                className="w-full h-auto object-contain max-w-[400px] mx-auto lg:mx-0"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default HeroSection

