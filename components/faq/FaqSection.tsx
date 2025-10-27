"use client"
import type React from "react"
import SectionHeader from "./SectionHeader"
import FaqItem from "./FaqItem"

const faqData = [
  {
    question: "What is Escrowise, and how does it work?",
    answer:
      "Escrowise is a secure payment platform that acts as a trusted third party in transactions. It holds funds until both parties fulfill their obligations, ensuring safe and secure transactions between buyers and sellers.",
  },
  {
    question: "Why should I use Escrowise instead of direct payments?",
    answer:
      "Escrowise provides an extra layer of security by holding funds until both parties are satisfied with the transaction. This protects buyers from fraud and sellers from payment disputes.",
  },
  {
    question: "How long does an escrow transaction take?",
    answer:
      "The duration of an escrow transaction depends on the parties involved. Once the buyer deposits funds, the seller delivers the goods or services, and the buyer approves, the funds are released to the seller. This process can take anywhere from a few days to several weeks.",
  },
  {
    question: "What are the fees for using Escrowise?",
    answer:
      "Escrowise charges a small percentage fee based on the transaction amount. The exact fee structure can be found on our pricing page, with discounts available for high-volume users.",
  },
  {
    question: "Is Escrowise safe to use?",
    answer:
      "Yes, Escrowise employs bank-level security measures to protect your transactions and personal information. We use encryption, secure servers, and regular security audits to ensure the highest level of safety.",
  },
  {
    question: "What payment methods does Escrowise accept?",
    answer:
      "Escrowise accepts various payment methods including credit/debit cards, bank transfers, and select digital payment platforms. The available options may vary depending on your location.",
  },
  {
    question: "What happens if there's a dispute?",
    answer:
      "Escrowise offers a dispute resolution process where our team reviews the case, examines evidence from both parties, and makes a fair decision based on the transaction terms and provided documentation.",
  },
  {
    question: "Can I use Escrowise for international transactions?",
    answer:
      "Yes, Escrowise supports international transactions across multiple currencies. We handle currency conversion and ensure compliance with international regulations.",
  },
  {
    question: "How do I withdraw my funds?",
    answer:
      "Once a transaction is complete, sellers can withdraw funds to their bank account or other supported payment methods through the dashboard. Withdrawals typically process within 1-3 business days.",
  },
  {
    question: "How do I get started with Escrowise?",
    answer:
      "Getting started is easy! Simply create an account, verify your identity, and you can begin using our services. For detailed instructions, visit our Getting Started guide.",
  },
]

const FaqSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <SectionHeader
        title="FAQ & Help"
        description="Find everything you need to know about using Escrowise for secure transactions."
      />

      <div className="flex flex-col gap-4 sm:gap-6">
        {faqData.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  )
}

export default FaqSection

