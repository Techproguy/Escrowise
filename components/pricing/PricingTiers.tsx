import type React from "react"
import PricingCard from "./PricingCard"

const PricingTiers: React.FC = () => {
  const pricingData = [
    {
      title: "Standard Escrow",
      description: "For Individuals, Freelancers, small e-commerce deals, online sellers, small business transactions.",
      price: "3.25%",
      minimum: "(minimum $10)",
      priceLabel: "per transaction",
      features: [
        "Secure fund holding",
        "Buyer & seller protection",
        "Fast & Transparent",
        "Dispute resolution support",
      ],
    },
    {
      title: "Business Escrow",
      description: "Designed for Agencies, real estate, bulk transactions, high-ticket deals.",
      price: "2.75%",
      minimum: "(minimum $25)",
      priceLabel: "per transaction",
      features: [
        "Lower fees for transactions over $10,000",
        "Multi-currency support",
        "Priority dispute resolution",
        "Custom escrow terms",
      ],
    },
    {
      title: "Enterprise Escrow",
      description: "For Large businesses, real estate developers, investment firms, Custom Solutions.",
      price: "Custom Pricing",
      minimum: "",
      priceLabel: "Contact sales for volume-based discounts",
      features: [
        "Dedicated account manager",
        "Advanced security & compliance",
        "API integration for automated transactions",
        "Priority support & legal advisory",
      ],
      isEnterprise: true,
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {pricingData.map((tier, index) => (
          <div key={index} className="w-full">
            <PricingCard {...tier} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingTiers

