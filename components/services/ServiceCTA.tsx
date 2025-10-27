import type React from "react"
import Link from "next/link"

const ServiceCTA: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 sm:py-16">
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white mb-4">
          Ready to secure your transaction?
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-white max-w-2xl mx-auto mb-8">
          Choose the escrow service that fits your needs and start transacting with confidence today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/newtransaction"
            className="px-8 py-3 text-base font-bold tracking-tighter text-orange-500 bg-white hover:bg-gray-100 transition-colors rounded-xl shadow-sm"
          >
            Start Transaction
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 text-base font-bold tracking-tighter text-white border-2 border-white hover:bg-white hover:text-orange-500 transition-colors rounded-xl"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServiceCTA

