"use client"
import type React from "react"
import { Clock } from "lucide-react"

const IntegrationsSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-6">
        Connected Accounts & Integrations
      </h2>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 mb-6 rounded-full bg-orange-100 flex items-center justify-center">
          <Clock className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tighter text-black mb-3">Coming Soon</h3>
        <p className="text-base text-gray-600 max-w-md mb-6">
          We're working on adding integrations with payment processors, marketplaces, and other services to enhance your
          escrow experience.
        </p>
        <div className="w-full max-w-md">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  In Development
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">65%</span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
              <div
                style={{ width: "65%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-400"
              ></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Stay tuned for updates on our upcoming integrations with popular services.
        </p>
      </div>
    </div>
  )
}

export default IntegrationsSettings

