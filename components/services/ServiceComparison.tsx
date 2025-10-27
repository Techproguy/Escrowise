import type React from "react"
import { Check, X } from "lucide-react"

const ServiceComparison: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Service Comparison
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Compare our different escrow service options to find the right fit for your needs
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 text-left font-bold text-lg text-black">Features</th>
              <th className="p-4 bg-orange-50 text-center font-bold text-lg text-black">Standard</th>
              <th className="p-4 bg-orange-100 text-center font-bold text-lg text-black">Business</th>
              <th className="p-4 bg-orange-200 text-center font-bold text-lg text-black">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Transaction Fee</td>
              <td className="p-4 text-center bg-orange-50">3.25%</td>
              <td className="p-4 text-center bg-orange-100">2.75%</td>
              <td className="p-4 text-center bg-orange-200">Custom</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Minimum Fee</td>
              <td className="p-4 text-center bg-orange-50">$10</td>
              <td className="p-4 text-center bg-orange-100">$25</td>
              <td className="p-4 text-center bg-orange-200">Custom</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Multi-Currency Support</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Cryptocurrency Support</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Custom Escrow Terms</td>
              <td className="p-4 text-center bg-orange-50">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Priority Support</td>
              <td className="p-4 text-center bg-orange-50">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">API Access</td>
              <td className="p-4 text-center bg-orange-50">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Dedicated Account Manager</td>
              <td className="p-4 text-center bg-orange-50">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-100">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center bg-orange-200">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ServiceComparison

