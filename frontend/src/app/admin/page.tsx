'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Briefcase, Users, Star } from 'lucide-react'
import AdminGate from '@/components/admin/AdminGate'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import JobsTable from '@/components/admin/JobsTable'
import ApplicationsTable from '@/components/admin/ApplicationsTable'
import PostJobForm from '@/components/admin/PostJobForm'
import EditJobModal from '@/components/admin/EditJobModal'
import StatsChart from '@/components/admin/StatsChart'
import { jobsApi, applicationsApi, Job } from '@/lib/api'

type Tab = 'jobs' | 'applications' | 'post'

function AdminDashboard() {
  const [tab,     setTab]     = useState<Tab>('jobs')
  const [editJob, setEditJob] = useState<Job | null>(null)
  const [toast,   setToast]   = useState('')

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }, [])

  const handleComingSoon = useCallback((label: string) => {
    showToast(`${label} — this feature is coming soon! 🚀`)
  }, [showToast])

  const { data: jobsData,  isLoading: jobsLoading  } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  })
  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ['admin-apps'],
    queryFn: () => applicationsApi.getAll().then((r) => r.data),
  })

  const jobs         = jobsData?.data ?? []
  const applications = appsData?.data ?? []
  const featuredCount = jobs.filter((j) => j.featured).length

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      <AdminSidebar
        activeTab={tab}
        onTabChange={(t) => setTab(t as Tab)}
        applicationCount={applications.length}
        onComingSoon={handleComingSoon}
      />

      <div className="flex-1 lg:ml-56 min-w-0">
        <AdminTopbar
          onPostJob={() => setTab('post')}
          toast={toast}
          onComingSoon={handleComingSoon}
        />

        <main className="px-4 sm:px-6 lg:px-8 py-8">

          {/* ── JOBS TAB ── */}
          {tab === 'jobs' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 font-heading">Job Listings</h1>
                  <p className="text-gray-500 text-sm mt-0.5">{jobs.length} jobs posted</p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'New candidates to review', value: applications.length, icon: Users,     bg: 'bg-primary-500' },
                  { label: 'Jobs open',                value: jobs.length,         icon: Briefcase, bg: 'bg-teal-500'    },
                  { label: 'Featured listings',        value: featuredCount,       icon: Star,      bg: 'bg-[#26A4FF]'  },
                ].map(({ label, value, icon: Icon, bg }) => (
                  <div key={label} className={`${bg} rounded-2xl p-5 flex items-center justify-between`}>
                    <div>
                      <p className="text-sm font-medium text-white/90">{label}</p>
                      <p className="text-4xl font-black text-white mt-1">{value}</p>
                    </div>
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              {jobs.length > 0 && <StatsChart jobs={jobs} />}

              {/* Table */}
              <JobsTable
                jobs={jobs}
                isLoading={jobsLoading}
                onEdit={setEditJob}
                onPostJob={() => setTab('post')}
                onDeleted={showToast}
              />
            </>
          )}

          {/* ── APPLICATIONS TAB ── */}
          {tab === 'applications' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 font-heading">All Applicants</h1>
                <p className="text-gray-500 text-sm mt-0.5">{applications.length} total applications received</p>
              </div>
              <ApplicationsTable applications={applications} isLoading={appsLoading} />
            </>
          )}

          {/* ── POST JOB TAB ── */}
          {tab === 'post' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 font-heading">Post a New Job</h1>
                <p className="text-gray-500 text-sm mt-0.5">Fill in the details to publish a new listing</p>
              </div>
              <PostJobForm
                onSuccess={showToast}
                onSwitchToJobs={() => setTab('jobs')}
              />
            </>
          )}
        </main>
      </div>

      {editJob && <EditJobModal job={editJob} onClose={() => setEditJob(null)} />}
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  )
}