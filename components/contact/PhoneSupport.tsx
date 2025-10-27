"use client"
import { Phone } from "lucide-react"

function PhoneSupport() {
  return (
    <section className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Phone className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-bold tracking-tighter text-black">Phone Support</h2>
      </div>

      <p className="mb-4 text-base text-gray-700">
        If you have a question or need immediate support, please use our live phone support. It is available Monday to
        Friday 8:00 a.m. to 4:00 p.m., Pacific Time.
      </p>

      <div className="mb-6 space-y-2">
        <p className="text-base font-medium">
          USA and Canada (Toll Free): <span className="text-orange-600">828-522-8617</span>
        </p>
        <p className="text-base font-medium">
          Australia (Toll Free): <span className="text-orange-600">1313ESCROWISE (1324 812 718)</span>
        </p>
        <p className="text-base font-medium">
          Other Countries: <span className="text-orange-600">+1-415-801-2270</span>
        </p>
      </div>

      <p className="mb-4 text-base text-gray-700">
        For customer assistance beyond our phone support hours, please send us an email at{" "}
        <a href="mailto:support@escrowise.com" className="font-medium text-orange-600 hover:underline">
          support@escrowise.com
        </a>{" "}
        instead. We will have one of our Email Support Representatives reach you at the soonest possible time.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="mb-2 text-base font-medium">We can assist you with:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Verifying transaction status</li>
            <li>Sending amendment forms</li>
            <li>Explaining general escrow</li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-base font-medium">
            We can assist with the following, but may not perform them on your behalf:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Entering tracking information</li>
            <li>Accepting merchandise</li>
            <li>Rejecting merchandise</li>
            <li>Submitting a payment</li>
            <li>Agreeing to terms</li>
            <li>Sending a lost password</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PhoneSupport

