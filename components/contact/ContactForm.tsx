"use client"
import * as React from "react"

interface ContactFormProps {
  contactType: string
}

function ContactForm({ contactType }: ContactFormProps) {
  const [transactionId, setTransactionId] = React.useState("")
  const [feedback, setFeedback] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")

  const getPlaceholderText = () => {
    switch (contactType) {
      case "email-support":
        return "Please describe your issue in detail. Include any relevant information that might help us assist you better."
      case "feedback":
        return "Please share your feedback about your experience with Escrowise. What did you like? What could be improved?"
      case "complaint":
        return "Please provide details about your complaint. Include dates, transaction details, and any other relevant information."
      default:
        return "Please provide detailed information about your inquiry"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ contactType, transactionId, feedback, email, name })
    alert("Your message has been submitted. We'll get back to you soon!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold tracking-tighter text-black mb-6">Your Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="transaction-id" className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Number (optional)
        </label>
        <input
          type="text"
          id="transaction-id"
          placeholder="Transaction ID"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          id="feedback"
          placeholder={getPlaceholderText()}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none h-32"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="px-8 py-3 text-base font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-xl shadow-sm hover:shadow-md transition-colors"
      >
        Submit
      </button>
    </form>
  )
}

export default ContactForm

