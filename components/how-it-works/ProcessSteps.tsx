"use client"

import type React from "react"
import { Users, File, CreditCard, Truck, ClipboardCheck, DollarSign } from "lucide-react"
import { FadeIn } from "../animations/FadeIn"
import { motion } from "framer-motion"

interface ProcessStepProps {
  icon: React.ReactNode
  title: string
  description: string
  stepNumber: number
  isLast?: boolean
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description, stepNumber, isLast = false }) => {
  return (
    <div className="flex items-start gap-6 sm:gap-8">
      <div className="flex-shrink-0 relative">
        <motion.div
          className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl font-bold"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * stepNumber }}
        >
          {stepNumber}
        </motion.div>
        {!isLast && (
          <motion.div
            className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 bg-orange-200"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 * stepNumber }}
            style={{ height: "calc(100% - 48px)" }}
          ></motion.div>
        )}
      </div>
      <motion.div
        className="flex-grow pb-12"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 * stepNumber }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">{icon}</div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tighter text-black">{title}</h3>
        </div>
        <p className="text-base sm:text-lg tracking-tighter text-gray-700">{description}</p>
      </motion.div>
    </div>
  )
}

const ProcessSteps: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 sm:py-16 lg:py-24">
      <FadeIn direction="up">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
            The Escrowise Process
          </h2>
          <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
            Six simple steps to complete a secure transaction
          </p>
        </div>
      </FadeIn>

      <div className="px-4 sm:px-6">
        <ProcessStep
          icon={<Users className="w-5 h-5 text-orange-500" />}
          title="Agreement"
          description="Buyer and seller agree on terms, including price, delivery timeline, and inspection period. These terms form the basis of your escrow transaction."
          stepNumber={1}
        />
        <ProcessStep
          icon={<File className="w-5 h-5 text-orange-500" />}
          title="Transaction Creation"
          description="The transaction is created on Escrowise, detailing all the agreed terms. Both parties must approve these terms before proceeding."
          stepNumber={2}
        />
        <ProcessStep
          icon={<CreditCard className="w-5 h-5 text-orange-500" />}
          title="Buyer Payment"
          description="The buyer sends payment to Escrowise using one of our secure payment methods. The funds are held safely in our escrow account."
          stepNumber={3}
        />
        <ProcessStep
          icon={<Truck className="w-5 h-5 text-orange-500" />}
          title="Seller Delivery"
          description="After payment verification, the seller delivers the merchandise or service to the buyer according to the agreed terms."
          stepNumber={4}
        />
        <ProcessStep
          icon={<ClipboardCheck className="w-5 h-5 text-orange-500" />}
          title="Buyer Inspection"
          description="The buyer inspects the merchandise or service within the agreed inspection period to ensure it meets the expected standards."
          stepNumber={5}
        />
        <ProcessStep
          icon={<DollarSign className="w-5 h-5 text-orange-500" />}
          title="Payment Release"
          description="Upon buyer approval, Escrowise releases the funds to the seller, completing the transaction securely for both parties."
          stepNumber={6}
          isLast={true}
        />
      </div>
    </section>
  )
}

export default ProcessSteps

