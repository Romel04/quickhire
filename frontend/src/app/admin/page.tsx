'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus, Trash2, Eye, AlertCircle, CheckCircle2,
  Briefcase, Users, Star, LayoutDashboard,
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AdminGate from '@/components/admin/AdminGate'
import CompanyLogo from '@/components/shared/CompanyLogo'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { jobsApi, applicationsApi, CreateJobData } from '@/lib/api'
import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'Design', 'Sales', 'Marketing', 'Finance',
  'Technology', 'Engineering', 'Business', 'Human Resource',
]
const JOB_TYPES = ['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship']

const EMPTY_FORM: CreateJobData = {
  title: '', company: '', location: '', category: '',
  type: 'Full-Time', description: '', requirements: '',
  salary: '', featured: false,
}

function AdminDashboard() {
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<'jobs' | 'post'>('jobs')
  const [form, setForm] = useState<CreateJobData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  // ── Queries ──────────────────────────────────────────────────────────────
  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  })

  const { data: appsData } = useQuery({
    queryKey: ['admin-apps'],
    queryFn: () => applicationsApi.getAll().then((r) => r.data),
  })

  // ── Mutations ────────────────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setForm(EMPTY_FORM)
      setErrors({})
      setTab('jobs')
      showToast(`"${res.data.data.title}" posted successfully!`)
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e?.response?.data?.message ?? 'Failed to create job'
      setErrors({ submit: Array.isArray(msg) ? msg.join(', ') : msg })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: jobsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setDeleteId(null)
      showToast('Job deleted successfully.')
    },
  })

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.company.trim())     e.company     = 'Company is required'
    if (!form.location.trim())    e.location    = 'Location is required'
    if (!form.category)           e.category    = 'Category is required'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handlePost = () => {
    const ve = validate()
    if (Object.keys(ve).length) { setErrors(ve); return }
    setErrors({})
    createMutation.mutate(form)
  }

  const jobs = jobsData?.data ?? []
  const totalApps = appsData?.count ?? 0

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              </div>
            </div>
            <span className="text-lg font-black text-gray-900">QuickHire</span>
            <span className="text-xs font-semibold bg-primary-50 text-primary-500 px-2 py-0.5 rounded ml-1">
              Admin
            </span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast */}
        {toast && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3.5 mb-6 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm font-medium text-green-700">{toast}</p>
          </div>
        )}

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage job listings and view applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Jobs',        value: jobs.length,                          icon: Briefcase, color: 'bg-primary-50 text-primary-500' },
            { label: 'Applications',      value: totalApps,                            icon: Users,     color: 'bg-blue-50 text-blue-500'    },
            { label: 'Featured',          value: jobs.filter((j) => j.featured).length, icon: Star,     color: 'bg-yellow-50 text-yellow-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
                </div>
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', color)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed panel */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {[
              { key: 'jobs', label: `Listings (${jobs.length})`, icon: LayoutDashboard },
              { key: 'post', label: 'Post New Job',              icon: Plus            },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as 'jobs' | 'post')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors',
                  tab === key
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-500 hover:text-gray-900',
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* ── Jobs table ── */}
          {tab === 'jobs' && (
            <div className="p-6">
              {isLoading ? (
                <PageLoader />
              ) : jobs.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">📋</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs yet</h3>
                  <button onClick={() => setTab('post')} className={`${styles.btnPrimary} mt-2`}>
                    Post your first job
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Job', 'Category', 'Type', 'Applications', 'Featured', 'Actions'].map((h) => (
                          <th
                            key={h}
                            className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 last:pr-0 last:text-right"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <CompanyLogo company={job.company} size="sm" />
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate max-w-[180px]">
                                  {job.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                  {job.company} · {job.location}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                              {job.category}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-sm text-gray-600">{job.type}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-sm font-semibold text-gray-900">
                              {job._count?.applications ?? 0}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span
                              className={cn(
                                'text-xs px-2.5 py-1 rounded-full',
                                job.featured
                                  ? 'bg-yellow-50 text-yellow-600'
                                  : 'bg-gray-100 text-gray-500',
                              )}
                            >
                              {job.featured ? '⭐ Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/jobs/${job.id}`}
                                className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>

                              {deleteId === job.id ? (
                                <div className="flex items-center gap-1.5 ml-1">
                                  <span className="text-xs text-gray-500">Delete?</span>
                                  <button
                                    onClick={() => deleteMutation.mutate(job.id)}
                                    disabled={deleteMutation.isPending}
                                    className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setDeleteId(null)}
                                    className="text-xs bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg hover:bg-gray-300 transition-colors"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteId(job.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Post job form ── */}
          {tab === 'post' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Post a New Job</h2>

              {errors.submit && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div>
                  <label className={styles.fieldLabel}>Job Title <span className="text-red-500">*</span></label>
                  <input
                    type="text" placeholder="e.g. Senior Frontend Developer"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={errors.title ? styles.fieldInputError : styles.fieldInput}
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className={styles.fieldLabel}>Company <span className="text-red-500">*</span></label>
                  <input
                    type="text" placeholder="e.g. Google"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={errors.company ? styles.fieldInputError : styles.fieldInput}
                  />
                  {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className={styles.fieldLabel}>Location <span className="text-red-500">*</span></label>
                  <input
                    type="text" placeholder="e.g. San Francisco, US"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={errors.location ? styles.fieldInputError : styles.fieldInput}
                  />
                  {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className={styles.fieldLabel}>Category <span className="text-red-500">*</span></label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={errors.category ? `${styles.fieldInputError} bg-white` : `${styles.fieldInput} bg-white`}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                </div>

                {/* Type */}
                <div>
                  <label className={styles.fieldLabel}>Job Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className={`${styles.fieldInput} bg-white`}
                  >
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className={styles.fieldLabel}>
                    Salary Range <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text" placeholder="e.g. $80,000 – $120,000"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    className={styles.fieldInput}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className={styles.fieldLabel}>Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5} placeholder="Describe the role, responsibilities..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={errors.description ? `${styles.fieldInputError} resize-none` : `${styles.fieldInput} resize-none`}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>

                {/* Requirements */}
                <div className="md:col-span-2">
                  <label className={styles.fieldLabel}>
                    Requirements <span className="text-gray-400 font-normal">(optional — one per line)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="3+ years of React experience&#10;Strong TypeScript skills&#10;Experience with REST APIs"
                    value={form.requirements}
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                    className={`${styles.fieldInput} resize-none`}
                  />
                </div>

                {/* Featured */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Mark as featured{' '}
                      <span className="text-gray-400 font-normal">(shows on homepage)</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handlePost}
                  disabled={createMutation.isPending}
                  className={styles.btnPrimary}
                >
                  {createMutation.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <><Plus className="w-4 h-4" /> Post Job</>
                  )}
                </button>
                <button
                  onClick={() => { setForm(EMPTY_FORM); setErrors({}) }}
                  className={`${styles.btnGhost} border border-gray-200`}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Wrap with password gate
export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  )
}
