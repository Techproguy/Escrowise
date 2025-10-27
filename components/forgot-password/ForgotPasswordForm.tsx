"use client"
import { useState } from "react"
import type React from "react"

import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (touched) {
      validateEmail(value)
    }
  }

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value.trim()) {
      setError("Email is required")
      return false
    } else if (!emailRegex.test(value)) {
      setError("Please enter a valid email address")
      return false
    } else {
      setError("")
      return true
    }
  }

  const handleBlur = () => {
    setTouched(true)
    validateEmail(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (validateEmail(email)) {
      // In a real application, this would call an API to send a password reset email
      console.log("Password reset requested for:", email)
      setIsSubmitted(true)
    }
  }

  const getInputClasses = () => {
    const baseClasses = "w-full px-6 py-4 text-base tracking-tighter text-black rounded-xl border transition-all"

    if (!touched) {
      return `${baseClasses} border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`
    }

    return error
      ? `${baseClasses} border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent`
      : `${baseClasses} border-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`
  }

  return (
    <div className="w-full max-w-md py-8">
      <a href="/login" className="inline-flex items-center text-orange-400 hover:text-orange-500 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login
      </a>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-black">Forgot Password</h1>
      <p className="mt-4 text-base text-gray-600">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      {isSubmitted ? (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800">Check your email</h3>
              <p className="text-green-700">
                If an account exists for {email}, we've sent instructions to reset your password. Please check your
                inbox and spam folder.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses()}
                required
              />
              {touched && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {error ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              )}
            </div>
            {touched && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 mt-8 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Send Reset Instructions
          </button>
        </form>
      )}
    </div>
  )
}

