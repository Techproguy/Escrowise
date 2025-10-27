"use client"
import type React from "react"
import Header from "./Header"
import TransactionDetails from "./TransactionDetails"
import AlertBox from "./AlertBox"
import HistoryBox from "./HistoryBox"
import ItemDetails from "./ItemDetails"
import PaymentInfo from "./PaymentInfo"
import DomainTransferInstructions from "./DomainTransferInstructions"

const TransactionPage: React.FC = () => {
  return (
    <main className="flex flex-col bg-zinc-100 min-h-screen">
      <Header />
      <section className="px-4 sm:px-8 lg:px-16 py-6 sm:py-10 mx-auto w-full max-w-[1440px]">
        <TransactionDetails />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <AlertBox />
          <HistoryBox />
        </div>

        <DomainTransferInstructions />
        <ItemDetails />
        <PaymentInfo />

        <div className="flex flex-col gap-4">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => postAction("accept")} disabled={!transactionId || loadingAction!==null} className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold tracking-tighter text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm hover:shadow-md transition-colors disabled:opacity-50">
              {loadingAction === "accept" ? "Accepting..." : "Accept Transaction"}
            </button>
            <button onClick={() => postAction("deliver")} disabled={!transactionId || loadingAction!==null} className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 rounded-xl shadow-sm hover:shadow-md transition-colors disabled:opacity-50">
              {loadingAction === "deliver" ? "Submitting..." : "Confirm Domain Transfer"}
            </button>
            <button onClick={() => postAction("confirm-receipt")} disabled={!transactionId || loadingAction!==null} className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold tracking-tighter text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow-md transition-colors disabled:opacity-50">
              {loadingAction === "confirm-receipt" ? "Confirming..." : "Confirm Receipt"}
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex justify-between items-center">
            <button onClick={() => postAction("cancel")} disabled={!transactionId || loadingAction!==null} className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg tracking-tighter text-red-600 hover:text-red-700 rounded-xl border border-red-600 hover:border-red-700 transition-colors disabled:opacity-50">
              {loadingAction === "cancel" ? "Cancelling..." : "Cancel Transaction"}
            </button>

            <button className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg tracking-tighter text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TransactionPage

