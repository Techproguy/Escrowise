"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { signUp } from '../../src/auth';

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasMixedCase: false,
    hasNumberOrSpecial: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')

  // Validate form fields
  useEffect(() => {
    const newErrors = { ...errors }

    // First name validation
    if (touched.firstName) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
      } else {
        newErrors.firstName = ""
      }
    }

    // Last name validation
    if (touched.lastName) {
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
      } else {
        newErrors.lastName = ""
      }
    }

    // Email validation
    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      } else {
        newErrors.email = ""
      }
    }

    // Password validation
    if (touched.password) {
      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 7) {
        newErrors.password = "Password must be at least 7 characters"
      } else {
        newErrors.password = ""
      }
    }

    setErrors(newErrors)
  }, [formData, touched])

  // Check password strength
  useEffect(() => {
    const password = formData.password
    const hasMinLength = password.length >= 7
    const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
    const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    let score = 0
    if (hasMinLength) score++
    if (hasMixedCase) score++
    if (hasNumberOrSpecial) score++

    setPasswordStrength({
      score,
      hasMinLength,
      hasMixedCase,
      hasNumberOrSpecial,
    })
  }, [formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }

      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
        hasError = true
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
        hasError = true
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
      } else if (passwordStrength.score < 3) {
        newErrors.password = 'Password is not strong enough'
        hasError = true
      }

      setErrors(newErrors)

      if (hasError) {
        setIsLoading(false)
        return
      }

      // Submit the form
      try {
        await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
        // Redirect to login and show notification
        router.push("/login?verify=1");
      } catch (error: any) {
        setSubmissionStatus('error');
        setSubmissionError(error.message || 'An error occurred during sign up. Please try again.');
        setNotification(error.message || 'An error occurred during sign up. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } catch (error: any) {
      setSubmissionStatus('error');
      setSubmissionError(error.message || 'An error occurred during sign up. Please try again.');
      setNotification(error.message || 'An error occurred during sign up. Please try again.');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black">Create an account</h1>

      <div className="flex items-center gap-2 mt-4">
        <p className="text-base sm:text-lg tracking-tighter text-black">Already have an account?</p>
        <a
          href="/login"
          className="text-base sm:text-lg font-bold tracking-tighter text-orange-400 hover:text-orange-500 transition-colors"
        >
          Sign in
        </a>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("firstName")}
                required
              />
              {touched.firstName && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {errors.firstName ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              )}
            </div>
            {touched.firstName && errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("lastName")}
                required
              />
              {touched.lastName && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {errors.lastName ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              )}
            </div>
            {touched.lastName && errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>

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
                placeholder="Create a secure password"
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

        <div className="mt-6">
          <div className="mb-2">
            <p className="text-sm font-medium tracking-tighter text-black">Password strength:</p>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full transition-all ${
                  passwordStrength.score === 0
                    ? "w-0"
                    : passwordStrength.score === 1
                      ? "w-1/3 bg-red-500"
                      : passwordStrength.score === 2
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                }`}
              ></div>
            </div>
          </div>

          <p className="text-sm font-medium tracking-tighter text-black mt-4">Strong passwords have:</p>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-4 h-4 ${passwordStrength.hasMinLength ? "text-green-500" : "text-gray-300"}`}
              />
              <span
                className={`text-sm tracking-tighter ${passwordStrength.hasMinLength ? "text-black" : "text-gray-500"}`}
              >
                At least 7 characters
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-4 h-4 ${passwordStrength.hasMixedCase ? "text-green-500" : "text-gray-300"}`}
              />
              <span
                className={`text-sm tracking-tighter ${passwordStrength.hasMixedCase ? "text-black" : "text-gray-500"}`}
              >
                At least one UPPER case and one lower case character
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2
                className={`w-4 h-4 ${passwordStrength.hasNumberOrSpecial ? "text-green-500" : "text-gray-300"}`}
              />
              <span
                className={`text-sm tracking-tighter ${passwordStrength.hasNumberOrSpecial ? "text-black" : "text-gray-500"}`}
              >
                At least one number or special character
              </span>
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 mt-8 text-base font-bold tracking-tighter text-white bg-orange-400 hover:bg-orange-500 transition-colors rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoading ? 'Loading...' : 'Create Account'}
        </button>

        {notification && (
          <p className="mt-6 text-sm text-red-500 tracking-tighter">{notification}</p>
        )}

        <p className="mt-6 text-xs text-black opacity-70 tracking-tighter">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline hover:text-orange-400 transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-orange-400 transition-colors">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm
