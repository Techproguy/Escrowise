"use client"
import type React from "react"
import { useState } from "react"
import { CreditCard, Trash2, Plus, BanknoteIcon as Bank, Bitcoin } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "bank" | "crypto"
  name: string
  details: string
  isDefault: boolean
  expiryDate?: string
}

const PaymentMethodsSettings: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 09/2026",
      isDefault: true,
      expiryDate: "09/26",
    },
    {
      id: "bank-1",
      type: "bank",
      name: "Chase Bank",
      details: "Account ending in 5678",
      isDefault: false,
    },
    {
      id: "crypto-1",
      type: "crypto",
      name: "Bitcoin Wallet",
      details: "Wallet ending in 3FZbgi",
      isDefault: false,
    },
  ])

  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="w-6 h-6 text-gray-600" />
      case "bank":
        return <Bank className="w-6 h-6 text-gray-600" />
      case "crypto":
        return <Bitcoin className="w-6 h-6 text-gray-600" />
      default:
        return <CreditCard className="w-6 h-6 text-gray-600" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black">Payment Methods</h2>
        <button
          onClick={() => setShowAddPaymentModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No payment methods</h3>
          <p className="text-gray-500 mb-4">Add a payment method to start making transactions</p>
          <button
            onClick={() => setShowAddPaymentModal(true)}
            className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
          >
            Add Payment Method
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {getPaymentIcon(method.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.details}</p>
                </div>
                {method.isDefault && (
                  <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(method.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold tracking-tighter text-black mb-4">Billing Address</h3>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-medium">John Doe</p>
          <p className="text-gray-600">123 Main St</p>
          <p className="text-gray-600">San Francisco, CA 94105</p>
          <p className="text-gray-600">United States</p>
        </div>

        <button className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
          Edit billing address
        </button>
      </div>
    </div>
  )
}

export default PaymentMethodsSettings

