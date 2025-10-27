import type React from "react"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  imageSrc: string
  rating?: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  imageSrc,
  rating = 5, // Default to 5 stars if not specified
}) => {
  return (
    <article className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 rounded-xl sm:rounded-3xl bg-zinc-300 bg-opacity-50 transition-all hover:shadow-md">
      <div className="w-24 h-24 sm:w-32 sm:h-auto flex-shrink-0">
        <img
          src={imageSrc || "/placeholder.svg"}
          className="w-full h-full object-cover rounded-full sm:rounded-xl"
          alt={`${name} testimonial`}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-1 mb-2 sm:mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-black">{name}</h3>
            <p className="text-sm tracking-tighter text-black opacity-80">{role}</p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <blockquote className="text-base sm:text-lg tracking-tighter text-black italic">{quote}</blockquote>
      </div>
    </article>
  )
}

export default TestimonialCard

