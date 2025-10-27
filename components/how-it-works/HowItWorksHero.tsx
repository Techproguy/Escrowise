import type React from "react"

const HowItWorksHero: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-6">
        How Escrowise Works
      </h1>
      <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-3xl mx-auto mb-10">
        Our secure, transparent process ensures safe transactions between buyers and sellers. Learn how we protect both
        parties throughout the entire transaction lifecycle.
      </p>

      <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
            alt="Secure transaction process"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.66669 4.16669V15.8334L15.8334 10L6.66669 4.16669Z" fill="#F59E0B" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksHero

