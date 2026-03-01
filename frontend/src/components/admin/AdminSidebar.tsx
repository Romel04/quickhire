'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, Users, Plus, Building2, Settings, HelpCircle, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  activeTab: string
  onTabChange: (tab: string) => void
  applicationCount: number
  onComingSoon: (label: string) => void
}

const NAV = [
  { key: 'jobs',         label: 'Job Listing',    icon: LayoutDashboard },
  { key: 'applications', label: 'All Applicants', icon: Users           },
  { key: 'post',         label: 'Post a Job',     icon: Plus            },
]

const SETTINGS_NAV = [
  { label: 'Company Profile', icon: Building2  },
  { label: 'Settings',        icon: Settings   },
  { label: 'Help Center',     icon: HelpCircle },
]

export default function AdminSidebar({ activeTab, onTabChange, applicationCount, onComingSoon }: Props) {
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/quickhireLogo.png" alt="QuickHire" width={28} height={28} className="object-contain" />
          <span className="text-lg font-black text-gray-900 font-logo">QuickHire</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => onTabChange(key)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left',
              activeTab === key
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            {key === 'applications' && applicationCount > 0 && (
              <span className="ml-auto bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {applicationCount > 9 ? '9+' : applicationCount}
              </span>
            )}
          </button>
        ))}

        {/* Settings group */}
        <div className="pt-4 mt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">Settings</p>
          {SETTINGS_NAV.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => onComingSoon(label)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Back to site */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
          <LogOut className="w-4 h-4" />
          Back to site
        </Link>
      </div>
    </aside>
  )
}