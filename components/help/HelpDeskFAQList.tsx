"use client"
import type * as React from "react"
import { ChevronRight } from "lucide-react"

interface FAQItemProps {
  question: string
  onClick: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, onClick }) => {
  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-base tracking-tighter text-gray-800">{question}</span>
        <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0" />
      </button>
    </li>
  )
}

interface HelpDeskFAQListProps {
  category: string
}

export const HelpDeskFAQList: React.FC<HelpDeskFAQListProps> = ({ category }) => {
  // Organize FAQs by category
  const faqsByCategory: Record<string, string[]> = {
    Process: [
      "How does online escrow work?",
      "How long does the escrow process take?",
      "How do I check the status of my transactions?",
      "How do I change transaction details and terms?",
      "How do Buyers or Sellers cancel transactions?",
    ],
    Verification: [
      "What documents are required for verification?",
      "How long does the verification process take?",
      "Can I use Escrowise without completing verification?",
      "Why was my verification rejected?",
      "How do I update my verification information?",
    ],
    Shipment: [
      "How do I track my shipment?",
      "What shipping carriers are supported?",
      "Who pays for shipping costs?",
      "What happens if the item is damaged during shipping?",
      "Can I use my own shipping provider?",
    ],
    Payment: [
      "What payment methods are accepted?",
      "When are funds released to the Seller?",
      "How do I request a refund?",
      "Are there any transaction fees?",
      "Can I use cryptocurrency for payment?",
    ],
    Security: [
      "How does Escrowise protect me?",
      "Is my personal information secure?",
      "What happens if there's a dispute?",
      "How are funds protected during the transaction?",
      "What security measures does Escrowise use?",
    ],
    Returns: [
      "What is the return policy?",
      "How do I initiate a return?",
      "Who pays for return shipping?",
      "What happens if the seller refuses my return?",
      "How long do I have to return an item?",
    ],
  }

  const handleQuestionClick = (question: string) => {
    console.log(`Question clicked: ${question}`)
    // This would typically open the answer or navigate to a detailed page
  }

  const currentFAQs = faqsByCategory[category] || []

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold tracking-tighter text-black mb-6">{category} FAQs</h2>
      {currentFAQs.length > 0 ? (
        <ul className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {currentFAQs.map((question, index) => (
            <FAQItem key={index} question={question} onClick={() => handleQuestionClick(question)} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No FAQs available for this category.</p>
      )}
    </div>
  )
}

