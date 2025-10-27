import type React from "react"
import ProcessStep from "./ProcessStep"
import { FadeIn } from "./animations/FadeIn"
import { AnimatedCounter } from "./animations/AnimatedCounter"

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-0">
      <FadeIn direction="up">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-5 max-w-4xl mx-auto px-4">
            With over <AnimatedCounter value={7} suffix=" billion" className="text-orange-500" /> of
            transactions protected with Escrowise
          </h2>
          <p className="text-base sm:text-lg lg:text-xl tracking-tight text-slate-700 max-w-3xl mx-auto px-4">
            Escrowise provides a highly secure payment solution, protecting both buyers and sellers by minimizing
            counterparty risk. All escrowed funds are safely held in trust.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FadeIn direction="up" delay={100}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b164e3973cfff7421929acb0de59f26b74ee8349?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Signup on Escrowise"
            description="Create a free account on Escrowise and verify your business details."
            
          />
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/3880c7a1aaa026b9fd60139d554602bb1dc3dec0?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Initiate Transaction"
            description="Buyer and Seller create an escrow transaction and agree on terms."
            
          />
        </FadeIn>
        <FadeIn direction="up" delay={300}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/38ec1a63d35cbf8bf4a9d827e71aa4fd53981435?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Deposit Funds"
            description="Buyer securely deposits funds into Escrowise."
            
          />
        </FadeIn>
        <FadeIn direction="up" delay={400}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/fd74cba7ea9c40c18e1035ba8698cd54378a1025?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Deliver Product/Service"
            description="Seller fulfills their part of the agreement (e.g., delivers goods or services)."
            
          />
        </FadeIn>
        <FadeIn direction="up" delay={500}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0b3a83ebe700a0240921341be25393097896bee5?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Approval & Verification"
            description="Buyer reviews and approves the delivery."
            
          />
        </FadeIn>
        <FadeIn direction="up" delay={600}>
          <ProcessStep
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/54354e4ba0a3ec8fbcda269f871991d7dd332b2f?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
            title="Release Payment"
            description="Escrowise releases funds to the Seller once both parties confirm satisfaction."
            
          />
        </FadeIn>
      </div>
    </section>
  )
}

export default HowItWorksSection

