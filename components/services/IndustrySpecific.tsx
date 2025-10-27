import type React from "react"
import { Briefcase, ShoppingBag, Globe, Code, Car, Gem } from "lucide-react"

interface IndustryCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const IndustryCard: React.FC<IndustryCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-gray-700">{description}</p>
    </div>
  )
}

const IndustrySpecific: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Industry-Specific Solutions
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Tailored escrow services for various industries and transaction types
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <IndustryCard
          icon={<Briefcase className="w-6 h-6 text-orange-500" />}
          title="Business Acquisitions"
          description="Secure escrow services for mergers and acquisitions, ensuring smooth ownership transitions and protected payments."
        />
        <IndustryCard
          icon={<ShoppingBag className="w-6 h-6 text-orange-500" />}
          title="E-commerce"
          description="Protect online marketplace transactions with our specialized e-commerce escrow solutions for high-value items."
        />
        <IndustryCard
          icon={<Globe className="w-6 h-6 text-orange-500" />}
          title="Domain & Website Sales"
          description="Secure transfers of digital assets like domains, websites, and online businesses with our specialized escrow services."
        />
        <IndustryCard
          icon={<Code className="w-6 h-6 text-orange-500" />}
          title="Software & IP"
          description="Protect intellectual property transactions and software licensing deals with our specialized escrow solutions."
        />
        <IndustryCard
          icon={<Car className="w-6 h-6 text-orange-500" />}
          title="Vehicle Sales"
          description="Secure transactions for automobiles, boats, and other vehicles with our specialized vehicle escrow services."
        />
        <IndustryCard
          icon={<Gem className="w-6 h-6 text-orange-500" />}
          title="Luxury Goods"
          description="Protect transactions involving jewelry, art, collectibles, and other high-value luxury items."
        />
      </div>
    </section>
  )
}

export default IndustrySpecific

