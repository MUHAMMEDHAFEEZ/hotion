'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return false
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return false
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy')
      return false
    }
    return true
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem('hotion_user', JSON.stringify({
        email: formData.email,
        name: formData.name,
        id: Math.random().toString(36).substr(2, 9)
      }))
      router.push('/dashboard')
      setIsLoading(false)
    }, 1000)
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return 'bg-red-500'
      case 2: return 'bg-orange-400'
      case 3: return 'bg-orange-500'
      case 4:
      case 5: return 'bg-orange-600'
      default: return 'bg-gray-300'
    }
  }

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak'
      case 2: return 'Weak'
      case 3: return 'Fair'
      case 4: return 'Good'
      case 5: return 'Strong'
      default: return ''
    }
  }

  return (
    <div className="auth-form min-h-screen bg-gradient-to-br from-color-white via-color-orange-50 to-border-blue-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-text-gray-darker hover:text-color-blue-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-text-gray-darker font-medium">Back to home</span>
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-color-blue-primary to-text-blue-dark rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <h1 className="text-2xl font-bold text-text-black-light">Create your account</h1>
          <p className="text-text-gray-darker mt-2 font-medium">Join Hotion and start organizing your thoughts</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-8">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-orange-800 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-orange-900 bg-white placeholder-orange-400 font-medium"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-orange-800 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-orange-900 bg-white placeholder-orange-400 font-medium"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-orange-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-orange-900 bg-white placeholder-orange-400 pr-12 font-medium"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength(formData.password)
                            ? getStrengthColor(passwordStrength(formData.password))
                            : 'bg-orange-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-orange-600 font-medium">
                    {getStrengthText(passwordStrength(formData.password))}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-orange-800 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-orange-900 bg-white placeholder-orange-400 pr-12 font-medium"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <p className="text-xs text-orange-600 flex items-center font-medium">
                      <Check className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 font-medium">Passwords do not match</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="terms" className="text-sm text-orange-700 font-medium">
                I agree to the{' '}
                <Link href="/terms" className="text-orange-600 hover:text-orange-800 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-600 hover:text-orange-800 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-orange-600 font-medium">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-orange-600 hover:text-orange-800 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 text-lg">📝</span>
            </div>
            <p className="text-xs text-orange-700 font-medium">Rich Editor</p>
          </div>
          <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 text-lg">🗂️</span>
            </div>
            <p className="text-xs text-orange-700 font-medium">Databases</p>
          </div>
          <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 text-lg">👥</span>
            </div>
            <p className="text-xs text-orange-700 font-medium">Collaboration</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
