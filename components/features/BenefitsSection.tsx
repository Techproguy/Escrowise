import type React from "react"
import { CheckCircleIcon, LightBulbIcon, ShieldCheckIcon } from "@heroicons/react/24/solid"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all h-full">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>{icon}</div>
      <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-gray-700">{description}</p>
    </div>
  )
}

const BenefitsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Unlock the Power of Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
            title="Enhanced Productivity"
            description="Streamline your workflow and achieve more in less time with our intuitive tools."
            color="bg-green-500"
          />
          <BenefitCard
            icon={<LightBulbIcon className="h-6 w-6 text-white" />}
            title="Innovative Solutions"
            description="Discover cutting-edge features designed to solve your most pressing challenges."
            color="bg-yellow-500"
          />
          <BenefitCard
            icon={<ShieldCheckIcon className="h-6 w-6 text-white" />}
            title="Secure and Reliable"
            description="Trust in our robust security measures to protect your data and ensure peace of mind."
            color="bg-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection

