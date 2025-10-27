import type React from "react"
import ServiceCard from "./ServiceCard"

const ServicesSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">Our Services</h2>
        <p className="mt-2 sm:mt-2.5 text-base sm:text-lg lg:text-xl tracking-tighter text-black">
          Escrow services we offer
        </p>
        <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base lg:text-xl tracking-tighter text-center text-black max-w-[817px] mx-auto px-4 sm:px-6">
          At Escrowise, we provide secure and transparent escrow solutions tailored to various industries. Whether
          you're handling digital transactions, real estate deals, or large financial agreements, our escrow services
          ensure trust, security, and seamless transactions for all parties involved.
        </p>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <ServiceCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4ade4896a74c39665f00cc33179ee3287f483fd5?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Bitcoin & Cryptocurrency Escrow"
            description="Secure crypto transactions with protected fund transfers."
            className="w-full"
          />
          <ServiceCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/193b1fca4d60912994ee188f1b24c63093e4bfac?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Real Estate Escrow"
            description="Safeguard property deals by holding funds until conditions are met."
            className="w-full"
            titleWidth="w-full sm:w-[266px]"
            descriptionMarginTop="mt-2 sm:mt-4 lg:mt-14"
          />
          <ServiceCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c605aad7b9a4a197b6af200220b4ecde3dc10921?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Financial Escrow"
            description="Manage large financial transactions with fraud protection."
            className="w-full"
            titleWidth="w-full sm:w-[266px]"
            descriptionMarginTop="mt-2 sm:mt-4 lg:mt-14"
            titleWithBreak={true}
          />
          <ServiceCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/62addc96cfd6c8314c98be78dafae2eb71c394da?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Broker Escrow"
            description="Ensure fair commissions and secure payments in brokerage deals."
            className="w-full"
            titleWidth="w-full sm:w-[266px]"
            descriptionMarginTop="mt-2 sm:mt-4 lg:mt-14"
            titleWithBreak={true}
          />
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

