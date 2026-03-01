'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from "../../../public/quickhireLogo.png"

const NAV_LINKS = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Browse Companies', href: '/jobs' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <nav className="max-w-[1200px] mx-auto px-4 md:px-[125px] h-16 flex items-center justify-between">
          <div className="flex gap-x-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setOpen(false)}>
              <Image
                src={logo}
                alt="QuickHire Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-black text-gray-900 font-logo">QuickHire</span>
            </Link>

            {/* Nav links — desktop only */}
            <div className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary-500"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Auth buttons — desktop only */}
            <button className="hidden md:block text-sm font-semibold text-gray-700 hover:text-primary-500 transition-colors px-3 py-2">
              Login
            </button>
            <button className="hidden md:block bg-primary-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
              Sign Up
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 md:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-end px-6 py-5 border-b border-gray-100">
          {/* <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src={logo}
              alt="QuickHire Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-lg font-black text-gray-900">QuickHire</span>
          </Link> */}
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              {link.label}
            </Link>
          ))}
          
        {/* Auth buttons at bottom */}
        <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-3">
          <button className="w-full py-2.5 rounded-lg border-2 border-primary-500 text-primary-500 text-sm font-semibold hover:bg-primary-50 transition-colors">
            Login
          </button>
          <button className="w-full py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors">
            Sign Up
          </button>
        </div>
        </nav>

      </div>
    </>
  )
}