import type React from "react"
import { Bitcoin, Home, DollarSign, Users } from "lucide-react"

interface ServiceDetailProps {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  image: string
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ id, icon, title, description, features, image }) => {
  return (
    <div id={id} className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center py-12 sm:py-16">
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">{icon}</div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tighter text-black">{title}</h3>
          </div>

          <p className="text-base sm:text-lg tracking-tighter text-black">{description}</p>

          <div className="pt-4">
            <h4 className="text-lg font-bold tracking-tighter text-black mb-3">Key Features:</h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400 flex-shrink-0 mt-1"></div>
                  <span className="text-base tracking-tighter text-black">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`/services/${id}`}
            className="inline-block px-6 py-3 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-md shadow-sm"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
        <div className="bg-white rounded-2xl h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden shadow-md">
          <img
            src={image || "/placeholder.svg?height=400&width=600"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

const ServiceDetails: React.FC = () => {
  const services = [
    {
      id: "cryptocurrency",
      icon: <Bitcoin className="w-6 h-6 text-orange-500" />,
      title: "Bitcoin & Cryptocurrency Escrow",
      description:
        "Our cryptocurrency escrow service provides a secure way to buy, sell, and trade digital assets. We support Bitcoin, Ethereum, and other major cryptocurrencies, ensuring that both buyers and sellers are protected throughout the transaction process.",
      features: [
        "Multi-signature wallet technology for enhanced security",
        "Support for major cryptocurrencies including Bitcoin, Ethereum, and more",
        "Real-time transaction monitoring and verification",
        "Customizable escrow terms for crypto-specific transactions",
        "Integration with major blockchain networks",
      ],
      image: "https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg",
    },
    {
      id: "real-estate",
      icon: <Home className="w-6 h-6 text-orange-500" />,
      title: "Real Estate Escrow",
      description:
        "Our real estate escrow services ensure that property transactions proceed smoothly and securely. We handle the complexities of real estate deals, from document verification to fund transfers, protecting both buyers and sellers throughout the process.",
      features: [
        "Comprehensive title verification and document handling",
        "Secure holding of earnest money deposits",
        "Coordination with real estate agents, attorneys, and lenders",
        "Compliance with local real estate regulations and requirements",
        "Transparent closing process with detailed reporting",
      ],
      image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg",
    },
    {
      id: "financial",
      icon: <DollarSign className="w-6 h-6 text-orange-500" />,
      title: "Financial Escrow",
      description:
        "Our financial escrow services are designed for high-value transactions, investments, and business deals. We provide a secure environment for complex financial arrangements, ensuring that all conditions are met before funds are released.",
      features: [
        "Secure handling of large financial transactions",
        "Customizable milestone-based payment releases",
        "Multi-currency support for international transactions",
        "Detailed financial reporting and transaction tracking",
        "Compliance with international financial regulations",
      ],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diane-helentjaris-8Eiq70dFgU0-unsplash.jpg-vuNuWrPlb6DIDDThCvKslR0ahiIuZF.jpeg",
    },
    {
      id: "broker",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "Broker Escrow",
      description:
        "Our broker escrow services are tailored for intermediaries who facilitate transactions between parties. We ensure that commissions and fees are securely held and properly distributed once the transaction is complete, protecting all parties involved.",
      features: [
        "Secure commission holding and distribution",
        "Multi-party transaction support",
        "Automated fee calculation and distribution",
        "Integration with broker management systems",
        "Compliance with broker-specific regulations",
      ],
      image: "https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_1280.jpg",
    },
  ]

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="space-y-12 sm:space-y-16">
        {services.map((service, index) => (
          <ServiceDetail
            key={service.id}
            id={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
            image={service.image}
          />
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="/services"
          className="inline-block px-8 py-4 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
        >
          View All Services
        </a>
      </div>
    </section>
  )
}

export default ServiceDetails

