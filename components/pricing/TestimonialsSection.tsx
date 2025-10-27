import type React from "react"
import TestimonialCard from "./TestimonialCard"

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "James T.",
      role: "Real Estate Investor",
      quote:
        '"Escrowise made my first high-ticket transaction stress-free. The process was simple, and I felt secure knowing my money was protected until the deal was completed."',
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/dc9ba9d5c0e97030c2ae41eab39723376950c718?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02",
      rating: 5,
    },
    {
      name: "Sarai M.",
      role: "Graphic Designer",
      quote:
        "\"As a freelancer, I've struggled with late payments. Using Escrowise ensures I get paid on time and that clients are confident they'll receive quality work before releasing funds.\"",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a6fd79de705f9b8cef56f954ab7895f63b4643e9?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02",
      rating: 5,
    },
  ]

  return (
    <section className="w-full max-w-7xl mx-auto mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center mb-10 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">
          What Our Customers Say
        </h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl tracking-tighter text-black">
          Real people. Secure transactions. See why businesses rely on Escrowise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection

