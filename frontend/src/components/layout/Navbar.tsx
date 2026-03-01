'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from "../../public/quickhireLogo.png"

const NAV_LINKS = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Browse Companies', href: '/jobs' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-[1200px] mx-auto px-[125px] h-16 flex items-center justify-between">
        <div className="flex gap-x-10">
         {/* Logo */}
         <Link href="/" className="flex items-center gap-2 flex-shrink-0">
           <Image
            src={logo}
            alt="QuickHire Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-black text-gray-900">QuickHire</span>
        </Link>

        {/* Nav links — hidden on mobile */}
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

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold text-gray-700 hover:text-primary-500 transition-colors px-3 py-2">
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