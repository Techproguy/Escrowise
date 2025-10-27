"use client"
import type React from "react"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  description: string
  price: string
  minimum: string
  priceLabel: string
  features: string[]
  isEnterprise?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  minimum,
  priceLabel,
  features,
  isEnterprise = false,
}) => {
  return (
    <article className="flex flex-col h-full rounded-xl sm:rounded-3xl bg-[#EDE9DD] overflow-hidden transition-all hover:shadow-lg">
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">{title}</h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base tracking-tighter text-black min-h-[60px]">{description}</p>

        {isEnterprise ? (
          <div className="mt-6 sm:mt-8">
            <p className="text-xl sm:text-2xl font-bold tracking-tighter text-black">{price}</p>
            <p className="mt-1 text-sm sm:text-base tracking-tighter text-black">{priceLabel}</p>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8">
            <div className="flex items-end gap-2">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-black">{price}</p>
              <p className="mb-1 text-base sm:text-lg tracking-tighter text-black">{priceLabel}</p>
            </div>
            <p className="mt-1 text-sm tracking-tighter text-black">{minimum}</p>
          </div>
        )}

        <h3 className="mt-8 sm:mt-10 text-lg sm:text-xl font-bold tracking-tighter text-black">Features</h3>
        <ul className="mt-3 space-y-3 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base tracking-tighter text-black">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="/signup"
          className="block mt-8 px-6 py-3 sm:py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md w-full text-center"
        >
          Choose Plan
        </a>
      </div>

      <div className="p-4 sm:p-6 bg-[#9F9F9F] text-sm sm:text-base tracking-tighter text-black">
        <div className="flex gap-3 items-start">
          <p>
            No time limit. You only pay when you use our escrow services, with no recurring fees or hidden costs. This
            ensures that businesses and individuals only pay for what they need, when they need it.
          </p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10 13.3333V10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M10 6.66667H10.0083"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </article>
  )
}

export default PricingCard

