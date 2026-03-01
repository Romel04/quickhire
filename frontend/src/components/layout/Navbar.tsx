'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Browse Companies', href: '/jobs' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
            </div>
          </div>
          <span className="text-xl font-black text-gray-900">QuickHire</span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary-500'
                  : 'text-gray-600 hover:text-gray-900',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors px-3 py-2">
            Login
          </button>
          <button className="bg-primary-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}
