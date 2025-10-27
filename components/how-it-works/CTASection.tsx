import type React from "react"

const CTASection: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 sm:py-16">
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white mb-4">
          Ready to start a secure transaction?
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-white max-w-2xl mx-auto mb-8">
          Create an account today and experience the security and peace of mind that comes with Escrowise.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/newtransaction"
            className="inline-block px-8 py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md shadow-md"
          >
            Start an Escrow
          </a>
          <a
            href="/features"
            className="inline-block px-8 py-4 text-base font-bold tracking-tighter text-black border border-black hover:bg-gray-100 transition-colors rounded-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection

