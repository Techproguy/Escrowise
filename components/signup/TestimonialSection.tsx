import type React from "react"
import { Star } from "lucide-react"

const TestimonialSection: React.FC = () => {
  return (
    <article className="h-full w-full flex flex-col relative p-8 sm:p-12 lg:p-16">
      {/* Logo Section */}
      <div className="mb-16 sm:mb-20 lg:mb-24">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5703aeccc298eaa8457a9dbded23cedecdc22ed?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
          alt="Escrowise logo"
          className="w-[180px] sm:w-[220px] h-auto object-contain"
        />
      </div>

      {/* Testimonial Content */}
      <div className="flex-grow">
        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 mr-1" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter text-black leading-tight mb-8 sm:mb-10 lg:mb-12 max-w-[500px]">
          "Escrowise saved me from a potential scam. The process was clear, the support team was responsive, and I felt
          completely protected throughout the transaction. I'll never do high-value deals without it again!"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4da4e5020e3c4dcf85e2d10d2c5dbe02/0c467199df59dafef50e2ab4a00f18ee041c1697?placeholderIfAbsent=true"
              alt="Nathan P. profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tighter text-black">Nathan P.</h3>
            <p className="text-xs sm:text-sm tracking-tighter text-black opacity-80">Founder, PulseGrid Technologies</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-auto pt-10">
        <p className="text-sm text-black opacity-70 tracking-tighter">© 2025 Escrowise, Inc. All rights reserved</p>
      </div>
    </article>
  )
}

export default TestimonialSection

