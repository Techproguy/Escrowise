"use client"
import type React from "react"
import Header from "@/components/dashboard/Header"
import ShareOptions from "./ShareOptions"
import CopyLinkField from "./CopyLinkField"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const TransactionCreated: React.FC = () => {
  const transactionUrl = "https://www.escrow.com/log-in?tid=13090867"
  const transactionId = "13090867"

  return (
    <main className="flex flex-col bg-zinc-100 min-h-screen">
      <Header />

      <section className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-orange-500 transition-colors">
              Dashboard
            </Link>
            <ArrowRight size={16} />
            <Link href="/transactions" className="hover:text-orange-500 transition-colors">
              Transactions
            </Link>
            <ArrowRight size={16} />
            <span className="text-black">Transaction Created</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-lg sm:text-xl font-medium text-green-600">Success</h2>
          </div>

          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">
            Transaction Created!
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-base sm:text-lg tracking-tighter text-black">Transaction ID:</span>
            <span className="text-base sm:text-lg font-medium tracking-tighter text-black">#{transactionId}</span>
          </div>

          <p className="mb-8 sm:mb-10 text-base sm:text-lg tracking-tighter text-black max-w-[865px]">
            Your transaction has been created, waiting for both parties to agree. Share the transaction via the URL or
            QR code so that the Seller can agree to the terms.
          </p>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start mb-8 sm:mb-10">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b65d5ede558e956d3d64f27594372ad770da4bc"
                alt="QR Code"
                className="w-[154px] h-[154px]"
              />
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-auto">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="mb-4 text-lg sm:text-xl font-bold tracking-tighter text-black">Share Transaction</h3>
                <ShareOptions />
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 className="mb-4 text-lg sm:text-xl font-bold tracking-tighter text-black">Transaction Link</h3>
                <CopyLinkField url={transactionUrl} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href={`/demo`}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-sm hover:shadow-md text-center"
            >
              View Transaction
            </Link>
            <Link
              href="/"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base font-bold tracking-tighter text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-xl text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TransactionCreated

