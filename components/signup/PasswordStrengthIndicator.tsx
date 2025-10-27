import type React from "react"
import { CheckCircle2 } from "lucide-react"

interface PasswordStrengthIndicatorProps {
  password?: string
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = "" }) => {
  const hasMinLength = password.length >= 7
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

  const score = [hasMinLength, hasMixedCase, hasNumberOrSpecial].filter(Boolean).length

  return (
    <div className="mt-6">
      <div className="mb-2">
        <p className="text-sm font-medium tracking-tighter text-black">Password strength:</p>
        <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
          <div
            className={`h-full rounded-full transition-all ${
              score === 0
                ? "w-0"
                : score === 1
                  ? "w-1/3 bg-red-500"
                  : score === 2
                    ? "w-2/3 bg-yellow-500"
                    : "w-full bg-green-500"
            }`}
          ></div>
        </div>
      </div>

      <p className="text-sm font-medium tracking-tighter text-black mt-4">Strong passwords have:</p>
      <ul className="mt-2 space-y-2">
        <li className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${hasMinLength ? "text-green-500" : "text-gray-300"}`} />
          <span className={`text-sm tracking-tighter ${hasMinLength ? "text-black" : "text-gray-500"}`}>
            At least 7 characters
          </span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${hasMixedCase ? "text-green-500" : "text-gray-300"}`} />
          <span className={`text-sm tracking-tighter ${hasMixedCase ? "text-black" : "text-gray-500"}`}>
            At least one UPPER case and one lower case character
          </span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${hasNumberOrSpecial ? "text-green-500" : "text-gray-300"}`} />
          <span className={`text-sm tracking-tighter ${hasNumberOrSpecial ? "text-black" : "text-gray-500"}`}>
            At least one number or special character
          </span>
        </li>
      </ul>
    </div>
  )
}

export default PasswordStrengthIndicator

