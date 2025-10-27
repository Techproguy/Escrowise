import type React from "react"

const AboutHero: React.FC = () => {
  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-4">About Escrowise</h1>
        <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-2xl mx-auto">
          Secure, trusted online escrow services since 2010
        </p>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Escrowise headquarters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center px-4 max-w-2xl">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              "Bringing trust and security to online transactions worldwide"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero

