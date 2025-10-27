import type React from "react"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  position: string
  company: string
  rating: number
  imageSrc: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, position, company, rating, imageSrc }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} mr-1`}
            />
          ))}
      </div>
      <blockquote className="text-base tracking-tighter text-black italic mb-6">"{quote}"</blockquote>
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

const FeatureTestimonials: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-black mb-4">
          What Our Users Say
        </h2>
        <p className="text-base sm:text-lg tracking-tighter text-black max-w-3xl mx-auto">
          Hear from businesses and individuals who use Escrowise for their transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          quote="The dispute resolution feature saved us from a potentially disastrous transaction. The Escrowise team mediated professionally and helped us reach a fair solution."
          name="Robert Chen"
          position="Operations Manager"
          company="Global Imports Ltd."
          rating={5}
          imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        />
        <TestimonialCard
          quote="As a freelancer, I love the inspection period feature. It gives my clients confidence to pay upfront, knowing they can verify my work before funds are released."
          name="Emma Wilson"
          position="UX Designer"
          company="Freelance"
          rating={5}
          imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        />
        <TestimonialCard
          quote="The API integration was seamless. We've incorporated Escrowise into our marketplace, and our users appreciate the added security for high-value transactions."
          name="David Okafor"
          position="CTO"
          company="TechBazaar"
          rating={4}
          imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        />
      </div>
    </section>
  )
}

export default FeatureTestimonials

