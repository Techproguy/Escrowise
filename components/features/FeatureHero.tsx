import type React from "react"

const FeatureHero: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-6">
        Features & Benefits
      </h1>
      <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-3xl mx-auto mb-10">
        Discover how our comprehensive feature set creates the most secure escrow experience for both buyers and
        sellers.
      </p>

      <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Escrowise Platform Features - Secure digital transactions"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-8 px-6">
          <p className="text-white text-xl font-bold tracking-tighter">Trusted by over 250,000 users worldwide</p>
        </div>
      </div>
    </section>
  )
}

export default FeatureHero

