import type React from "react"
import { Check, X } from "lucide-react"

const FeatureComparison: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          Why Choose Escrowise?
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          See how we compare to traditional payment methods and direct transactions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 text-left font-bold text-lg text-black">Feature</th>
              <th className="p-4 bg-orange-50 text-center font-bold text-lg text-black">
                <span className="text-orange-500">Escrowise</span>
              </th>
              <th className="p-4 bg-gray-50 text-center font-bold text-lg text-black">Direct Payment</th>
              <th className="p-4 bg-gray-50 text-center font-bold text-lg text-black">Bank Transfer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Buyer Protection</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Seller Protection</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Inspection Period</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Dispute Resolution</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Transaction Tracking</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">International Support</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Cryptocurrency Support</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Secure Communication</td>
              <td className="p-4 text-center bg-orange-50">
                <Check className="w-6 h-6 text-green-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default FeatureComparison

