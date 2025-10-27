"use client"
import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

const SecuritySettings: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasMixedCase: false,
    hasNumberOrSpecial: false,
  })

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "newPassword") {
      // Check password strength
      const hasMinLength = value.length >= 8
      const hasMixedCase = /[a-z]/.test(value) && /[A-Z]/.test(value)
      const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)

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
    }

    if (name === "confirmPassword" && passwordForm.newPassword !== value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }))
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }))
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate and submit password change
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }))
      return
    }

    console.log("Password change submitted:", passwordForm)
    // Reset form after submission
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    // In a real app, this would trigger 2FA setup flow
  }

  const handleSessionTimeoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSessionTimeout(e.target.value)
  }

  return (
    <div className="space-y-8">
      {/* Password Change Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-6">Change Password</h2>

        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Password Strength Indicator */}
            {passwordForm.newPassword && (
              <div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-700">Password strength:</p>
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

                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    {passwordStrength.hasMinLength ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${passwordStrength.hasMinLength ? "text-green-700" : "text-gray-500"}`}>
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {passwordStrength.hasMixedCase ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${passwordStrength.hasMixedCase ? "text-green-700" : "text-gray-500"}`}>
                      Mix of uppercase & lowercase letters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {passwordStrength.hasNumberOrSpecial ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${passwordStrength.hasNumberOrSpecial ? "text-green-700" : "text-gray-500"}`}
                    >
                      At least one number or special character
                    </span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-6">Two-Factor Authentication</h2>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Enable 2FA</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account by requiring a verification code in addition to your
              password.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactorEnabled}
              onChange={handleTwoFactorToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-4">
              Two-factor authentication is enabled. You will be required to enter a verification code when signing in.
            </p>
            <button className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors">
              Configure 2FA settings
            </button>
          </div>
        )}
      </div>

      {/* Session Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black mb-6">Session Settings</h2>

        <div className="mb-6">
          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <select
            id="sessionTimeout"
            value={sessionTimeout}
            onChange={handleSessionTimeoutChange}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="240">4 hours</option>
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Your account will be automatically logged out after this period of inactivity.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tighter text-black">Active Sessions</h2>
          <button className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors">
            Sign out all devices
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-gray-500">Chrome on macOS • San Francisco, CA, USA</p>
              <p className="text-xs text-gray-400 mt-1">Started: April 5, 2025, 10:23 AM</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium">Mobile App</p>
              <p className="text-sm text-gray-500">iPhone 15 Pro • San Francisco, CA, USA</p>
              <p className="text-xs text-gray-400 mt-1">Last active: April 4, 2025, 3:45 PM</p>
            </div>
            <button className="text-sm text-red-500 hover:text-red-600 transition-colors">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings

