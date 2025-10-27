import type React from "react"

const PricingHeader: React.FC = () => {
  return (
    <div className="text-center w-full">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">Pricing</h1>
      <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl tracking-tighter text-black max-w-2xl mx-auto">
        Pay only for what you use—no hidden fees, no surprises.
      </p>
    </div>
  )
}

export default PricingHeader

