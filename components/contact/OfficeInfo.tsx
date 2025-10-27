"use client"
import { MapPin } from "lucide-react"

function OfficeInfo() {
  return (
    <section className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-bold tracking-tighter text-black">Our Office</h2>
      </div>

      <p className="text-base text-gray-700">To send us any mail correspondence, use the mailing address below:</p>

      <address className="mt-3 not-italic text-base font-medium">
        Escrowise.com
        <br />
        123 Westview Ave, Suite 500
        <br />
        Springfield, USA
      </address>
    </section>
  )
}

export default OfficeInfo

