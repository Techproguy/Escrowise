import type React from "react"
import { Shield, Lock, FileCheck, AlertTriangle } from "lucide-react"

const SecurityFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        <div className="w-full lg:w-1/2">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">
              Advanced Security Features
            </h2>
            <p className="text-base sm:text-lg tracking-tighter text-black">
              At Escrowise, security is our top priority. Our platform implements multiple layers of protection to
              ensure your transactions and data remain safe at all times.
            </p>

            <div className="space-y-6 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tighter text-black mb-2">Bank-Level Encryption</h3>
                  <p className="text-base tracking-tighter text-gray-700">
                    256-bit SSL encryption protects all communications and transactions on our platform, the same
                    standard used by leading financial institutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tighter text-black mb-2">Identity Verification</h3>
                  <p className="text-base tracking-tighter text-gray-700">
                    Multi-factor authentication and comprehensive KYC processes ensure that all users are properly
                    verified before engaging in transactions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tighter text-black mb-2">Regulatory Compliance</h3>
                  <p className="text-base tracking-tighter text-gray-700">
                    Our platform is fully compliant with international financial regulations, including AML and KYC
                    requirements across multiple jurisdictions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tighter text-black mb-2">Fraud Detection</h3>
                  <p className="text-base tracking-tighter text-gray-700">
                    Advanced AI-powered monitoring systems continuously scan for suspicious activities and potential
                    fraud attempts across all transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="bg-white rounded-2xl h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Security features visualization"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecurityFeatures

