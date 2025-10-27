import type React from "react"

const ServicesHero: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-6">
        Our Escrow Services
      </h1>
      <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-3xl mx-auto mb-10">
        Secure, transparent, and tailored escrow solutions for every transaction type. Discover how our specialized
        services can protect your business deals.
      </p>

      <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Escrowise Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center px-4 max-w-2xl">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              "Protecting transactions across industries since 2010"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesHero

