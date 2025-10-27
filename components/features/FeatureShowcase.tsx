"use client"
import type React from "react"
import { useState } from "react"
import { Smartphone, Monitor, CreditCard, MessageSquare, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "../animations/FadeIn"

interface FeatureTabProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  onClick: () => void
}

const FeatureTab: React.FC<FeatureTabProps> = ({ icon, title, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 text-left w-full transition-colors rounded-lg
      ${isActive ? "bg-orange-100" : "hover:bg-gray-100"}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center
      ${isActive ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"}`}
        animate={{
          backgroundColor: isActive ? "rgb(251 146 60)" : "rgb(229 231 235)",
          color: isActive ? "white" : "rgb(55 65 81)",
        }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <span className={`text-lg font-medium ${isActive ? "text-orange-500" : "text-gray-700"}`}>{title}</span>
      {isActive && <ChevronRight className="w-5 h-5 text-orange-500 ml-auto" />}
    </motion.button>
  )
}

const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mobile")

  const featureTabs = [
    {
      id: "mobile",
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Experience",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Manage transactions on the go with our fully responsive mobile experience.",
      list: [
        "Real-time notifications keep you updated",
        "Secure biometric authentication",
        "Complete escrow management from your phone",
        "Document scanning and upload capabilities",
        "Seamless payment processing on mobile",
      ],
    },
    {
      id: "dashboard",
      icon: <Monitor className="w-5 h-5" />,
      title: "Dashboard Analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Comprehensive analytics to track and manage all your escrow transactions.",
      list: [
        "Visual transaction status tracking",
        "Financial summaries and reporting",
        "Historical transaction data",
        "Export capabilities for accounting",
        "Custom filters and search functions",
      ],
    },
    {
      id: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payment Options",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Multiple secure payment methods to suit your transaction needs.",
      list: [
        "Credit and debit card processing",
        "Bank wire transfers",
        "Cryptocurrency integration",
        "International payment support",
        "Automated payment scheduling",
      ],
    },
    {
      id: "communication",
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Secure Communication",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      description: "End-to-end encrypted messaging between transaction parties.",
      list: [
        "Document sharing capabilities",
        "Transaction-specific chat rooms",
        "Automated status updates",
        "Message read receipts",
        "Negotiation tools and templates",
      ],
    },
  ]

  const activeFeature = featureTabs.find((tab) => tab.id === activeTab) || featureTabs[0]

  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24">
      <FadeIn direction="up">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
            Powerful Features in Action
          </h2>
          <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
            Explore our platform capabilities that make Escrowise the leading choice for secure transactions
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="w-full lg:w-1/3 space-y-2 order-2 lg:order-1">
          {featureTabs.map((tab) => (
            <FeatureTab
              key={tab.id}
              icon={tab.icon}
              title={tab.title}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
                  <img
                    src={activeFeature.image || "/placeholder.svg"}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tighter text-black mb-2">{activeFeature.title}</h3>
                  <p className="text-base tracking-tighter text-gray-700 mb-4">{activeFeature.description}</p>
                  <ul className="space-y-2">
                    {activeFeature.list.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        </div>
                        <span className="text-base tracking-tighter text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeatureShowcase

