import type React from "react"

const OurMission: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">Our Mission</h2>
            <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black">
              At Escrowise, our mission is to foster trust in digital transactions by providing secure, transparent, and
              reliable escrow services. We believe in creating a safer online marketplace where buyers and sellers can
              conduct business with confidence and peace of mind.
            </p>
            <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black">
              Every day, we work to eliminate fraud and reduce risk in online transactions, helping businesses and
              individuals protect themselves while engaging in digital commerce. Our commitment to security, compliance,
              and customer satisfaction drives everything we do.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="bg-stone-50 rounded-2xl h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Escrowise mission visualization"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurMission

