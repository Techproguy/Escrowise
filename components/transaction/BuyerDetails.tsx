"use client"
import type React from "react"

interface BuyerDetailsProps {
  haveBuyer: boolean
  agreeTerms: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function BuyerDetails({ haveBuyer, agreeTerms, onChange }: BuyerDetailsProps) {
  return (
    <section>
      <h2 className="mb-5 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-black">Buyer details</h2>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="haveBuyer"
            name="haveBuyer"
            checked={haveBuyer}
            onChange={onChange}
            className="h-5 w-5 rounded text-orange-400 focus:ring-orange-400"
          />
          <label htmlFor="haveBuyer" className="text-base sm:text-lg text-black">
            I have a buyer for this transaction
          </label>
        </div>

        <hr className="bg-orange-400 h-[2px] border-none" />

        <div className="flex gap-3 items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={onChange}
            className="h-5 w-5 mt-1 rounded text-orange-400 focus:ring-orange-400"
          />
          <label htmlFor="agreeTerms" className="text-base sm:text-lg text-black">
            I have read and agree to the{" "}
            <a href="#" className="text-orange-500 hover:underline">
              General Escrow Instructions
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="py-4 sm:py-5 mt-4 sm:mt-6 w-full text-base sm:text-lg font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!agreeTerms}
        >
          Start Transaction
        </button>
      </div>
    </section>
  )
}

export default BuyerDetails

