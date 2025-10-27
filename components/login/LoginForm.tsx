"use client"
import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { signIn } from '../../src/auth';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showVerifyNotice, setShowVerifyNotice] = useState(searchParams?.get('verify') === '1');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Basic validation on change
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }))
      } else if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
      } else {
        setErrors((prev) => ({ ...prev, email: "" }))
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }))
      } else {
        setErrors((prev) => ({ ...prev, password: "" }))
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmissionError('')

    try {
      // Validate form before submission
      let hasError = false
      const newErrors = {
        email: '',
        password: '',
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
        hasError = true
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
        hasError = true
      }
      if (!formData.password) {
        newErrors.password = 'Password is required'
        hasError = true
      }

      setErrors(newErrors)

      if (hasError) {
        setIsLoading(false)
        return
      }

      // Submit the form
      await signIn(formData.email, formData.password);
      setSubmissionStatus('success');
      setSubmissionError('');
      router.replace("/transactions");
    } catch (error: any) {
      setSubmissionStatus('error')
      setSubmissionError(error.message || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const getInputClasses = (fieldName: keyof typeof errors) => {
    const baseClasses = "w-full px-6 py-4 text-base tracking-tighter text-black rounded-xl border transition-all"

    if (!touched[fieldName]) {
      return `${baseClasses} border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`
    }

    return errors[fieldName]
      ? `${baseClasses} border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent`
      : `${baseClasses} border-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`
  }

  return (
    <div className="w-full max-w-md py-16">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">Welcome back</h1>

      <div className="flex items-center gap-2 mt-4">
        <p className="text-base sm:text-lg tracking-tighter text-black">New to Escrowise?</p>
        <a
          href="/signup"
          className="text-base sm:text-lg font-bold tracking-tighter text-orange-400 hover:text-orange-500 transition-colors"
        >
          Sign up
        </a>
      </div>

      {showVerifyNotice && (
        <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-300 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <span className="text-blue-800 text-sm">Please check your email and verify your address before signing in.</span>
          </div>
          <button
            type="button"
            className="ml-4 text-blue-500 hover:text-blue-700 text-xl font-bold"
            aria-label="Dismiss notification"
            onClick={() => setShowVerifyNotice(false)}
          >
            ×
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("email")}
                required
              />
              {touched.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {errors.email ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              )}
            </div>
            {touched.email && errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("password")}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {touched.password &&
                  (errors.password ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ))}
              </div>
            </div>
            {touched.password && errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={toggleRememberMe}
              className="h-4 w-4 text-orange-400 focus:ring-orange-400 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className="text-sm font-medium text-orange-400 hover:text-orange-500 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 mt-8 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        {submissionError && <p className="mt-2 text-sm text-red-500">{submissionError}</p>}
      </form>
    </div>
  )
}

export default LoginForm
