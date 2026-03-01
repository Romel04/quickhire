'use client'

import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { styles } from '@/lib/styles'

const SESSION_KEY = 'qh_admin_auth'

interface AdminGateProps {
  children: React.ReactNode
}

export default function AdminGate({ children }: AdminGateProps) {
  const [isAuthed, setIsAuthed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check sessionStorage on mount
  useEffect(() => {
    const authed = sessionStorage.getItem(SESSION_KEY)
    if (authed === 'true') setIsAuthed(true)
    setChecked(true)
  }, [])

  const handleSubmit = () => {
    if (!password.trim()) {
      setError('Please enter the admin password')
      return
    }

    setIsLoading(true)
    setError('')

    // Small delay to feel intentional
    setTimeout(() => {
      const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
      if (password === correctPassword) {
        sessionStorage.setItem(SESSION_KEY, 'true')
        setIsAuthed(true)
      } else {
        setError('Incorrect password. Please try again.')
        setPassword('')
      }
      setIsLoading(false)
    }, 400)
  }

  // Wait for client check
  if (!checked) return null

  // Already authenticated — render admin panel
  if (isAuthed) return <>{children}</>

  // Password gate UI
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* Icon */}
          <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-primary-500" />
          </div>

          {/* Heading */}
          <h1 className="text-xl font-black text-gray-900 text-center mb-1">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the admin password to continue
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Password field */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={cn(error ? styles.fieldInputError : styles.fieldInput, 'pr-12')}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={cn(styles.btnPrimary, "w-full justify-center")}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Password is set via{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            NEXT_PUBLIC_ADMIN_PASSWORD
          </code>
        </p>
      </div>
    </div>
  )
}
