import type React from "react"
import { Shield } from "lucide-react"

const EscrowExplained: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-orange-400" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black">
                What is Escrow?
              </h2>
            </div>
            <p className="text-base sm:text-lg tracking-tighter text-black">
              An escrow is a financial arrangement where a third party holds and regulates payment of funds or assets
              for two parties in a transaction. It helps make transactions more secure by keeping the payment in a
              secure account until all terms of the agreement are met.
            </p>
            <p className="text-base sm:text-lg tracking-tighter text-black">
              This method protects both the buyer and seller in a transaction. The buyer can verify that the goods or
              services are as promised before the seller receives payment, and the seller can ensure they will be paid
              once they deliver on their promises.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-bold tracking-tighter text-black mb-3">Common uses for escrow include:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <span className="text-base sm:text-lg tracking-tighter text-black">High-value online purchases</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <span className="text-base sm:text-lg tracking-tighter text-black">Real estate transactions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <span className="text-base sm:text-lg tracking-tighter text-black">Business acquisitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <span className="text-base sm:text-lg tracking-tighter text-black">Digital asset transfers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  <span className="text-base sm:text-lg tracking-tighter text-black">Cryptocurrency transactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="bg-stone-50 rounded-2xl h-[300px] sm:h-[350px] lg:h-[450px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Secure business transaction handshake"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EscrowExplained

