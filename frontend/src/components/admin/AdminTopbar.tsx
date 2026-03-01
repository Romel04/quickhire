'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, ChevronDown, Plus, LogOut, User, CheckCircle2, X } from 'lucide-react'
import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface Props {
  onPostJob: () => void
  toast: string
  onComingSoon: (label: string) => void
}

const NOTIFICATIONS = [
  { id: 1, text: 'New application received for Senior Developer',   time: '2 min ago',  unread: true  },
  { id: 2, text: 'Your job post "UI Designer" is now live',         time: '1 hour ago', unread: true  },
  { id: 3, text: 'Application from Sarah K. needs review',          time: '3 hours ago', unread: false },
]

export default function AdminTopbar({ onPostJob, toast, onComingSoon }: Props) {
  const router = useRouter()
  const [adminOpen, setAdminOpen]  = useState(false)
  const [bellOpen,  setBellOpen]   = useState(false)
  const adminRef = useRef<HTMLDivElement>(null)
  const bellRef  = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (adminRef.current && !adminRef.current.contains(e.target as Node)) setAdminOpen(false)
      if (bellRef.current  && !bellRef.current.contains(e.target  as Node)) setBellOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed')
    router.push('/admin')
    router.refresh()
  }

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

      {/* Left — mobile logo */}
      <div className="flex items-center gap-4">
        <span className="lg:hidden font-black text-gray-900 font-logo text-lg">QuickHire</span>

        {/* Admin dropdown */}
        <div ref={adminRef} className="relative hidden lg:block">
          <button
            onClick={() => { setAdminOpen((v) => !v); setBellOpen(false) }}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors select-none"
          >
            <div className="w-6 h-6 bg-primary-500 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              A
            </div>
            <span>Admin</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform duration-200', adminOpen && 'rotate-180')} />
          </button>

          {adminOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-400 mt-0.5">Logged in</p>
              </div>
              <button
                onClick={() => { onComingSoon('Profile'); setAdminOpen(false) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" /> View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Bell */}
        <div ref={bellRef} className="relative">
          <button
            onClick={() => { setBellOpen((v) => !v); setAdminOpen(false) }}
            className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {bellOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl border border-gray-100 shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={cn('px-4 py-3 flex items-start gap-3', n.unread && 'bg-primary-50/40')}>
                    <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.unread ? 'bg-primary-500' : 'bg-gray-300')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">That's all your notifications</p>
              </div>
            </div>
          )}
        </div>

        {/* Post a job */}
        <button onClick={onPostJob} className={styles.btnPrimary}>
          <Plus className="w-4 h-4" /> Post a job
        </button>

        {/* Mobile logout */}
        <button
          onClick={handleLogout}
          className="lg:hidden p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          title="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}
    </header>
  )
}