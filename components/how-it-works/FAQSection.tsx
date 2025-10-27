"use client"
import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden transition-all hover:shadow-md border border-gray-200">
      <button
        onClick={toggleExpand}
        className="flex justify-between items-center w-full p-6 text-left"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-black pr-4">{question}</h3>
        <ChevronDown
          className={`h-6 w-6 text-orange-400 flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          <p className="text-base tracking-tighter text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  )
}

const FAQSection: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Common questions about our escrow process
        </p>
      </div>

      <div className="space-y-4">
        <FAQItem
          question="How long does the escrow process take?"
          answer="The duration varies depending on the transaction type and how quickly both parties complete their steps. Typically, once payment is secured and the seller delivers the item or service, the inspection period is 2-5 business days. After approval, funds are released to the seller within 1-2 business days."
        />
        <FAQItem
          question="What happens if I'm not satisfied with what I receive?"
          answer="If you're not satisfied with the received item or service, you should immediately report this within your inspection period. Escrowise will assist in resolving the dispute by reviewing evidence from both parties against the terms of the agreement, and determine the appropriate outcome."
        />
        <FAQItem
          question="How much does Escrowise charge for its services?"
          answer="Our fee structure is based on a percentage of the transaction amount, typically ranging from 0.89% to 3.25%, with a minimum fee per transaction. The exact fee depends on the transaction type, payment method, and total value. You can find detailed pricing information on our Pricing page."
        />
        <FAQItem
          question="Can I use Escrowise for international transactions?"
          answer="Yes, Escrowise supports international transactions and offers multi-currency options. We handle the complexities of cross-border escrow transactions, including currency conversion and compliance with international regulations, making global trade safer and simpler."
        />
        <FAQItem
          question="Is my personal and financial information secure?"
          answer="Absolutely. We implement bank-level security measures, including encryption, secure servers, and regular security audits. We're also fully compliant with data protection regulations. Your personal and financial information is protected throughout the entire transaction process."
        />
      </div>
    </section>
  )
}

export default FAQSection

