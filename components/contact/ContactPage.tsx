"use client"
import * as React from "react"
import ContactTypeSelection from "./ContactTypeSelection"
import ContactForm from "./ContactForm"
import PhoneSupport from "./PhoneSupport"
import OfficeInfo from "./OfficeInfo"
import Header from "@/components/dashboard/Header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function ContactPage() {
  const [selectedOption, setSelectedOption] = React.useState<string>("email-support")

  const handleOptionChange = (id: string) => {
    setSelectedOption(id)
  }

  return (
    <main className="flex flex-col min-h-screen bg-zinc-100">
      <Header />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 mx-auto w-full max-w-[1440px]">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/help"
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Help Center</span>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-8">
          We're here to help
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10">
          <ContactTypeSelection selectedOption={selectedOption} onOptionChange={handleOptionChange} />

          <hr className="my-8 h-0.5 bg-orange-200 border-0" />

          <ContactForm contactType={selectedOption} />

          <div className="mt-12">
            <PhoneSupport />
            <OfficeInfo />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage

