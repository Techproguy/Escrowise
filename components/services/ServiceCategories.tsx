import type React from "react"
import { Bitcoin, Home, DollarSign, Users } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all h-full">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-gray-700 mb-4">{description}</p>
      <Link
        href={link}
        className="text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-1"
      >
        Learn more
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}

const ServiceCategories: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Our Service Categories
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Specialized escrow solutions for different transaction types
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <ServiceCard
          icon={<Bitcoin className="w-6 h-6 text-orange-500" />}
          title="Cryptocurrency Escrow"
          description="Secure Bitcoin, Ethereum, and other cryptocurrency transactions with our specialized blockchain escrow services."
          link="#crypto"
        />
        <ServiceCard
          icon={<Home className="w-6 h-6 text-orange-500" />}
          title="Real Estate Escrow"
          description="Protect property transactions with our comprehensive real estate escrow services for buyers and sellers."
          link="#realestate"
        />
        <ServiceCard
          icon={<DollarSign className="w-6 h-6 text-orange-500" />}
          title="Financial Escrow"
          description="Secure large financial transactions and investments with our regulated financial escrow services."
          link="#financial"
        />
        <ServiceCard
          icon={<Users className="w-6 h-6 text-orange-500" />}
          title="Broker Escrow"
          description="Specialized escrow services for brokers and agents handling client transactions and commissions."
          link="#broker"
        />
      </div>
    </section>
  )
}

export default ServiceCategories

