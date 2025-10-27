import type React from "react"
import Link from "next/link"

const CompanySection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">
              Escrowise – Trusted & Secure Escrow Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl tracking-tighter text-black">
              Escrowise is a leading, licensed online escrow service, providing secure and transparent transactions
              worldwide.
              <br />
              <br />
              As a regulated and audited escrow provider, we adhere to the highest standards of compliance and security
              to protect your funds. Independent audits and regulatory oversight ensure the safety, reliability, and
              integrity of every transaction handled through Escrowise.
            </p>
            <div className="pt-4 sm:pt-6">
              <Link href="/signup" className="px-6 sm:px-8 py-3 sm:py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="bg-stone-50 bg-opacity-60 rounded-[20px] sm:rounded-[30px] h-[300px] sm:h-[350px] lg:h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/88d9627fb6c064368603340aeed89e8f2e94b290?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
                alt="Company background"
                className="object-cover absolute inset-0 w-full h-full"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/44e0ea3887e96cbd804834ba67e5d575857ede7f?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
                alt="Company logo"
                className="relative z-10 w-[80px] sm:w-[106px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanySection

