import type React from "react"
import { Shield, Clock, Globe, Users, FileCheck, MessageSquare, Settings, Tag } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{title}</h3>
      <p className="text-base tracking-tighter text-gray-700">{description}</p>
    </div>
  )
}

const CoreFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Core Platform Features
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Everything you need for secure transactions in one powerful platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <FeatureCard
          icon={<Shield className="w-6 h-6 text-orange-500" />}
          title="Secure Transactions"
          description="Advanced encryption and protection measures keep your payment details and personal information safe."
        />
        <FeatureCard
          icon={<Clock className="w-6 h-6 text-orange-500" />}
          title="Real-Time Tracking"
          description="Monitor the status of your transactions at every step, from agreement to final payment."
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6 text-orange-500" />}
          title="International Support"
          description="Conduct transactions globally with multi-currency options and international compliance."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6 text-orange-500" />}
          title="Dispute Resolution"
          description="Professional mediation services to resolve disagreements between transaction parties."
        />
        <FeatureCard
          icon={<FileCheck className="w-6 h-6 text-orange-500" />}
          title="Inspection Period"
          description="Customizable timeframes for buyers to verify goods or services before payment release."
        />
        <FeatureCard
          icon={<MessageSquare className="w-6 h-6 text-orange-500" />}
          title="Secure Messaging"
          description="Built-in communication tools for buyers and sellers to discuss transaction details."
        />
        <FeatureCard
          icon={<Settings className="w-6 h-6 text-orange-500" />}
          title="API Integration"
          description="Easily integrate our escrow services into your website or marketplace platform."
        />
        <FeatureCard
          icon={<Tag className="w-6 h-6 text-orange-500" />}
          title="Transparent Pricing"
          description="Clear fee structure with no hidden costs, displayed before finalizing any transaction."
        />
      </div>
    </section>
  )
}

export default CoreFeatures

