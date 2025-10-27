"use client"
import type React from "react"
import { ArrowLeft } from "lucide-react"

interface FAQDetailProps {
  question: string
  onBack: () => void
}

export const FAQDetail: React.FC<FAQDetailProps> = ({ question, onBack }) => {
  // This is a placeholder for the actual FAQ content
  // In a real implementation, you would fetch the answer based on the question
  const getAnswer = (q: string) => {
    switch (q) {
      case "How does online escrow work?":
        return (
          <>
            <p className="mb-4">
              Online escrow works by acting as a trusted third party that collects, holds, and disburses funds according
              to buyer and seller instructions. Here's how the process typically works:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Buyer and seller agree to terms of the transaction</li>
              <li>Buyer pays Escrowise</li>
              <li>Escrowise verifies the payment</li>
              <li>Seller ships merchandise to buyer</li>
              <li>Buyer accepts the merchandise</li>
              <li>Escrowise pays the seller</li>
            </ol>
            <p>
              This process protects both the buyer and seller by ensuring that all conditions are met before money
              changes hands.
            </p>
          </>
        )
      case "How long does the escrow process take?":
        return (
          <p>
            The escrow process timeline varies depending on the transaction type, payment method, and how quickly both
            parties complete their required actions. Typically, once payment is secured, the seller ships the item, and
            the buyer has an inspection period (usually 2-5 business days) to verify the item meets expectations. After
            approval, funds are released to the seller within 1-2 business days. The entire process can take anywhere
            from a few days to a couple of weeks.
          </p>
        )
      default:
        return (
          <p>
            This information is currently being updated. Please check back soon or contact our support team for
            immediate assistance.
          </p>
        )
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-orange-500 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to FAQs</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold tracking-tighter text-black mb-4">{question}</h2>
        <div className="text-base text-gray-700 leading-relaxed">{getAnswer(question)}</div>
      </div>
    </div>
  )
}

