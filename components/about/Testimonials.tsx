import type React from "react"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  position: string
  company: string
  imageSrc: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, position, company, imageSrc }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
          ))}
      </div>
      <blockquote className="text-lg tracking-tighter text-black italic mb-6">"{quote}"</blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={imageSrc || "/placeholder.svg?height=100&width=100"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tighter text-black">{name}</h3>
          <p className="text-sm text-gray-600">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}

const Testimonials: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          What Our Partners Say
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Trusted by businesses and individuals across industries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <TestimonialCard
          quote="Escrowise transformed how our marketplace handles high-value transactions. Their API integration was seamless, and our users report significantly higher confidence levels."
          name="Jason Reed"
          position="CTO"
          company="TechMarket Inc."
          imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        />
        <TestimonialCard
          quote="The level of security and compliance that Escrowise provides has been invaluable for our international real estate transactions. Their customer service is exceptional."
          name="Maria Sanchez"
          position="Operations Director"
          company="Global Properties"
          imageSrc="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        />
        <TestimonialCard
          quote="As a crypto exchange, we needed an escrow partner who understood blockchain technology. Escrowise delivered with their specialized cryptocurrency escrow solutions."
          name="Alex Zhang"
          position="Founder"
          company="BitTrade Exchange"
          imageSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
        />
      </div>
    </section>
  )
}

export default Testimonials

