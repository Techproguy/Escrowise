import type React from "react"
import { Shield, Lock, Clock, CheckCircle } from "lucide-react"

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
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Benefits of Using Escrowise
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Our escrow service offers multiple advantages for both buyers and sellers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <BenefitCard
          icon={<Shield className="w-6 h-6 text-white" />}
          title="Reduced Risk"
          description="Our escrow service acts as a trusted third party, ensuring funds are only released when all conditions are met, protecting both buyers and sellers from fraud."
          color="bg-orange-400"
        />
        <BenefitCard
          icon={<Lock className="w-6 h-6 text-white" />}
          title="Secure Transactions"
          description="With bank-level security systems and encryption, your personal information and financial details are always protected throughout the transaction."
          color="bg-amber-400"
        />
        <BenefitCard
          icon={<Clock className="w-6 h-6 text-white" />}
          title="Convenient Process"
          description="Our streamlined, user-friendly platform makes it easy to create, manage, and complete escrow transactions from anywhere in the world."
          color="bg-green-500"
        />
        <BenefitCard
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          title="Peace of Mind"
          description="Know that your transaction is protected with professional oversight and a clear resolution process if any disputes arise between parties."
          color="bg-blue-500"
        />
      </div>
    </section>
  )
}

export default BenefitsSection

