"use client"

import type React from "react"
import Header from "@/components/dashboard/Header"
import VerificationFlow from "./VerificationFlow"

const VerifyAccountPage: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
      <Header />

      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">
          Please verify your account
        </h1>

        <div className="bg-white rounded-xl sm:rounded-3xl shadow-sm mt-6 sm:mt-8 p-6 sm:p-8 lg:p-10">
          <VerificationFlow />
        </div>
      </div>
    </main>
  )
}

export default VerifyAccountPage

