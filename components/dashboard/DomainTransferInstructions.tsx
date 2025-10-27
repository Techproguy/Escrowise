"use client"
import type React from "react"
import { Globe, CheckCircle } from "lucide-react"

const DomainTransferInstructions: React.FC = () => {
  return (
    <section className="p-6 sm:p-8 mb-8 bg-white rounded-xl sm:rounded-3xl shadow-sm">
      <header className="flex gap-2.5 items-center mb-6 sm:mb-8">
        <Globe className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-black">
          Domain Transfer Instructions
        </h2>
      </header>

      <div className="mb-6 sm:mb-8">
        <p className="mb-4 text-base sm:text-lg tracking-tighter text-gray-700">
          To complete this transaction, the domain needs to be transferred to the buyer. Please follow these steps:
        </p>

        <ol className="space-y-4 pl-6 list-decimal">
          <li className="text-base sm:text-lg tracking-tighter text-gray-700">
            <span className="font-medium">Unlock the domain</span> at your current registrar and disable any privacy
            protection.
          </li>
          <li className="text-base sm:text-lg tracking-tighter text-gray-700">
            <span className="font-medium">Obtain the authorization/EPP code</span> from your current registrar.
          </li>
          <li className="text-base sm:text-lg tracking-tighter text-gray-700">
            <span className="font-medium">Provide the EPP code to the buyer</span> via the secure messaging system.
          </li>
          <li className="text-base sm:text-lg tracking-tighter text-gray-700">
            <span className="font-medium">Approve the transfer request</span> when you receive it from the buyer's
            registrar.
          </li>
        </ol>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm sm:text-base text-green-800">
          <span className="font-medium">Payment has been secured in escrow.</span> The funds will be released to you
          once the domain transfer is confirmed by the buyer.
        </p>
      </div>
    </section>
  )
}

export default DomainTransferInstructions

