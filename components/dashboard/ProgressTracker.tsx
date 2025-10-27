"use client"
import type React from "react"
import { ShoppingCart, Monitor, CreditCard, CheckCircle, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface StepProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  isCompleted: boolean
  isLast?: boolean
}

const Step: React.FC<StepProps> = ({ icon, title, isActive, isCompleted, isLast = false }) => {
  // Determine the color based on status
  const getColor = () => {
    if (isCompleted) {
      return "bg-green-500 text-white"
    }
    if (isActive) {
      return "bg-amber-400 text-white"
    }
    return "bg-gray-200 text-gray-400"
  }

  // Determine the line color
  const getLineColor = () => {
    if (isCompleted) {
      return "bg-green-500"
    }
    return "bg-gray-200"
  }

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex items-center">
        <motion.div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${getColor()} transition-colors`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        {!isLast && (
          <motion.div
            className={`w-16 sm:w-24 md:w-32 h-0.5 ${getLineColor()} transition-colors absolute left-[calc(100%_-_6px)]`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        )}
      </div>
      <motion.div
        className="mt-3 text-sm text-gray-600 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.div>
    </div>
  )
}

interface ProgressTrackerProps {
  currentStep: number
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep = 3 }) => {
  const steps = [
    {
      title: "Agreement",
      icon: <ShoppingCart size={20} />,
    },
    {
      title: "Payment",
      icon: <CreditCard size={20} />,
    },
    {
      title: "Transfer",
      icon: <Globe size={20} />,
    },
    {
      title: "Inspection",
      icon: <Monitor size={20} />,
    },
    {
      title: "Closed",
      icon: <CheckCircle size={20} />,
    },
  ]

  return (
    <div className="flex justify-between w-full max-w-4xl mx-auto py-6 px-2">
      {steps.map((step, index) => (
        <Step
          key={index}
          icon={step.icon}
          title={step.title}
          isActive={index === currentStep - 1}
          isCompleted={index < currentStep - 1}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  )
}

export default ProgressTracker

