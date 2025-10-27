"use client"
import type React from "react"
import TestimonialSection from "./TestimonialSection"
import SignUpForm from "./SignUpForm"

const SignUpPage: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Left side - Testimonial */}
      <div className="w-full lg:w-1/2 h-full bg-[#EDE9DD]">
        <TestimonialSection />
      </div>
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-0 bg-white">
        <SignUpForm />
      </div>
    </section>
  )
}

export default SignUpPage

