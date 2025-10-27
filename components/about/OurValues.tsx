import type React from "react"
import { Shield, Users, Scale, RefreshCw } from "lucide-react"

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-gray-700">{description}</p>
    </div>
  )
}

const OurValues: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">Our Values</h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          These core principles guide our work and shape our company culture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <ValueCard
          icon={<Shield className="w-6 h-6 text-orange-500" />}
          title="Security"
          description="We implement robust security measures to protect every transaction and user data, ensuring the highest level of trust."
        />
        <ValueCard
          icon={<Scale className="w-6 h-6 text-orange-500" />}
          title="Integrity"
          description="We operate with honesty and transparency in all our dealings, maintaining the highest ethical standards."
        />
        <ValueCard
          icon={<Users className="w-6 h-6 text-orange-500" />}
          title="Customer Focus"
          description="We prioritize our customers' needs and continuously strive to improve their experience with our services."
        />
        <ValueCard
          icon={<RefreshCw className="w-6 h-6 text-orange-500" />}
          title="Innovation"
          description="We constantly evolve our technology and processes to provide cutting-edge escrow solutions for a changing world."
        />
      </div>
    </section>
  )
}

export default OurValues

