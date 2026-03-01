'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Users, Briefcase, Star,
  Plus, Trash2, Pencil, X, CheckCircle2,
  AlertCircle, ChevronDown, Bell, LogOut,
  FileText, Settings, HelpCircle, Building2,
  ExternalLink,
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AdminGate from '@/components/admin/AdminGate'
import CompanyLogo from '@/components/shared/CompanyLogo'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { jobsApi, applicationsApi, CreateJobData, Job } from '@/lib/api'
import { styles, getCategoryTag } from '@/lib/styles'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource']
const JOB_TYPES = ['Full-Time','Part-Time','Remote','Contract','Internship']
const EMPTY_FORM: CreateJobData = {
  title:'', company:'', location:'', category:'',
  type:'Full-Time', description:'', requirements:'', salary:'', featured:false,
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditJobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const queryClient = useQueryClient()
  const [form, setForm] = useState<Partial<CreateJobData>>({
    title: job.title, company: job.company, location: job.location,
    category: job.category, type: job.type, description: job.description,
    requirements: job.requirements ?? '', salary: job.salary ?? '',
    featured: job.featured,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateMutation = useMutation({
    mutationFn: () => jobsApi.update(job.id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      onClose()
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e?.response?.data?.message ?? 'Update failed'
      setErrors({ submit: Array.isArray(msg) ? msg.join(', ') : msg })
    },
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title?.trim())       e.title       = 'Title is required'
    if (!form.company?.trim())     e.company     = 'Company is required'
    if (!form.location?.trim())    e.location    = 'Location is required'
    if (!form.category)            e.category    = 'Category is required'
    if (!form.description?.trim()) e.description = 'Description is required'
    return e
  }

  const handleSave = () => {
    const ve = validate()
    if (Object.keys(ve).length) { setErrors(ve); return }
    setErrors({})
    updateMutation.mutate()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-black text-gray-900">Edit Job</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {errors.submit && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={styles.fieldLabel}>Job Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.title ?? ''} onChange={(e) => setForm({...form, title: e.target.value})}
                className={errors.title ? styles.fieldInputError : styles.fieldInput} />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className={styles.fieldLabel}>Company <span className="text-red-500">*</span></label>
              <input type="text" value={form.company ?? ''} onChange={(e) => setForm({...form, company: e.target.value})}
                className={errors.company ? styles.fieldInputError : styles.fieldInput} />
              {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
            </div>
            <div>
              <label className={styles.fieldLabel}>Location <span className="text-red-500">*</span></label>
              <input type="text" value={form.location ?? ''} onChange={(e) => setForm({...form, location: e.target.value})}
                className={errors.location ? styles.fieldInputError : styles.fieldInput} />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
            <div>
              <label className={styles.fieldLabel}>Category <span className="text-red-500">*</span></label>
              <select value={form.category ?? ''} onChange={(e) => setForm({...form, category: e.target.value})}
                className={errors.category ? styles.fieldInputError : styles.fieldInput}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className={styles.fieldLabel}>Job Type</label>
              <select value={form.type ?? 'Full-Time'} onChange={(e) => setForm({...form, type: e.target.value})}
                className={styles.fieldInput}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={styles.fieldLabel}>Salary <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="text" placeholder="e.g. $80,000 – $120,000" value={form.salary ?? ''}
                onChange={(e) => setForm({...form, salary: e.target.value})}
                className={styles.fieldInput} />
            </div>
            <div className="sm:col-span-2">
              <label className={styles.fieldLabel}>Description <span className="text-red-500">*</span></label>
              <textarea rows={4} value={form.description ?? ''} onChange={(e) => setForm({...form, description: e.target.value})}
                className={cn(errors.description ? styles.fieldInputError : styles.fieldInput, 'resize-none')} />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={styles.fieldLabel}>Requirements <span className="text-gray-400 font-normal">(one per line)</span></label>
              <textarea rows={3} value={form.requirements ?? ''} onChange={(e) => setForm({...form, requirements: e.target.value})}
                className={cn(styles.fieldInput, 'resize-none')} />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={form.featured ?? false}
                  onChange={(e) => setForm({...form, featured: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 accent-primary-500" />
                <span className="text-sm font-medium text-gray-700">
                  Mark as featured <span className="text-gray-400 font-normal">(shows on homepage)</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button onClick={onClose} className={styles.btnGhost}>Cancel</button>
          <button onClick={handleSave} disabled={updateMutation.isPending} className={styles.btnPrimary}>
            {updateMutation.isPending
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
              : <><CheckCircle2 className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
function AdminDashboard() {
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<'jobs' | 'post' | 'applications'>('jobs')
  const [form, setForm] = useState<CreateJobData>(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editJob, setEditJob] = useState<Job | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  })

  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ['admin-apps'],
    queryFn: () => applicationsApi.getAll().then((r) => r.data),
  })

  const createMutation = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setForm(EMPTY_FORM)
      setFormErrors({})
      setTab('jobs')
      showToast(`"${res.data.data.title}" posted successfully!`)
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e?.response?.data?.message ?? 'Failed to create job'
      setFormErrors({ submit: Array.isArray(msg) ? msg.join(', ') : msg })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: jobsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setDeleteId(null)
      showToast('Job deleted successfully.')
    },
  })

  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.company.trim())     e.company     = 'Company is required'
    if (!form.location.trim())    e.location    = 'Location is required'
    if (!form.category)           e.category    = 'Category is required'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handlePost = () => {
    const ve = validateForm()
    if (Object.keys(ve).length) { setFormErrors(ve); return }
    setFormErrors({})
    createMutation.mutate(form)
  }

  const jobs = jobsData?.data ?? []
  const applications = appsData?.data ?? []
  const featuredCount = jobs.filter((j) => j.featured).length

  const NAV = [
    { key: 'jobs',         label: 'Job Listing',     icon: Briefcase },
    { key: 'applications', label: 'All Applicants',  icon: Users     },
    { key: 'post',         label: 'Post a Job',      icon: Plus      },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
              </div>
            </div>
            <span className="text-lg font-black text-gray-900">QuickHire</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key as typeof tab)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left',
                tab === key
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {key === 'applications' && applications.length > 0 && (
                <span className="ml-auto bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {applications.length > 9 ? '9+' : applications.length}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">Settings</p>
            {[
              { label: 'Company Profile', icon: Building2 },
              { label: 'Settings',        icon: Settings  },
              { label: 'Help Center',     icon: HelpCircle },
            ].map(({ label, icon: Icon }) => (
              <button key={label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100">
          <Link href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-56 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              </div>
            </div>
            <span className="font-black text-gray-900">QuickHire</span>
          </Link>

          {/* Company selector */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors select-none">
            <div className="w-6 h-6 bg-primary-500 rounded-md flex items-center justify-center text-white text-xs font-bold">N</div>
            <span>Nomad</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => setTab('post')} className={styles.btnPrimary}>
              <Plus className="w-4 h-4" /> Post a job
            </button>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Toast */}
          {toast && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3.5 mb-6 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm font-medium text-green-700">{toast}</p>
            </div>
          )}

          {/* ── JOBS TAB ── */}
          {tab === 'jobs' && (
            <>
              {/* Page title */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">Job Listings</h1>
                  <p className="text-gray-500 text-sm mt-0.5">{jobs.length} jobs posted</p>
                </div>
                <button onClick={() => setTab('post')} className={styles.btnPrimary}>
                  <Plus className="w-4 h-4" /> Post New Job
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'New candidates to review', value: appsData?.count ?? 0,  icon: Users,     bg: 'bg-primary-500', text: 'text-white' },
                  { label: 'Jobs open',                value: jobs.length,            icon: Briefcase, bg: 'bg-teal-500',    text: 'text-white' },
                  { label: 'Featured listings',        value: featuredCount,          icon: Star,      bg: 'bg-[#26A4FF]',  text: 'text-white' },
                ].map(({ label, value, icon: Icon, bg, text }) => (
                  <div key={label} className={cn('rounded-2xl p-5 flex items-center justify-between', bg)}>
                    <div>
                      <p className={cn('text-sm font-medium opacity-90', text)}>{label}</p>
                      <p className={cn('text-4xl font-black mt-1', text)}>{value}</p>
                    </div>
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className={cn('w-6 h-6', text)} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">All Jobs</h2>
                  <span className="text-sm text-gray-400">{jobs.length} total</span>
                </div>
                {jobsLoading ? <PageLoader /> : jobs.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-3">📋</p>
                    <h3 className="font-bold text-gray-900 mb-2">No jobs yet</h3>
                    <button onClick={() => setTab('post')} className={cn(styles.btnPrimary, 'mt-2')}>
                      Post your first job
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          {['Job', 'Category', 'Type', 'Applications', 'Featured', 'Actions'].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide py-3 px-4 last:text-right">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {jobs.map((job) => (
                          <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <CompanyLogo company={job.company} size="sm" />
                                <div className="min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm truncate max-w-[180px]">{job.title}</p>
                                  <p className="text-xs text-gray-500 truncate max-w-[180px]">{job.company} · {job.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={cn(styles.tag, getCategoryTag(job.category))}>{job.category}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">{job.type}</span>
                            </td>
                            <td className="py-4 px-4">
                              <button onClick={() => setTab('applications')}
                                className="text-sm font-semibold text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                                {job._count?.applications ?? 0}
                              </button>
                            </td>
                            <td className="py-4 px-4">
                              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium',
                                job.featured ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-500')}>
                                {job.featured ? '⭐ Yes' : 'No'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Link href={`/jobs/${job.id}`} target="_blank"
                                  className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                  title="View live">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                                <button onClick={() => setEditJob(job)}
                                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                {deleteId === job.id ? (
                                  <div className="flex items-center gap-1.5 ml-1">
                                    <span className="text-xs text-gray-500">Sure?</span>
                                    <button onClick={() => deleteMutation.mutate(job.id)}
                                      disabled={deleteMutation.isPending}
                                      className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50">
                                      Yes
                                    </button>
                                    <button onClick={() => setDeleteId(null)}
                                      className="text-xs bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg hover:bg-gray-300 transition-colors">
                                      No
                                    </button>
                                  </div>
                                ) : (
                                  <button onClick={() => setDeleteId(job.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete">
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
            </>
          )}

          {/* ── APPLICATIONS TAB ── */}
          {tab === 'applications' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900">All Applicants</h1>
                <p className="text-gray-500 text-sm mt-0.5">{applications.length} total applications received</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Applications</h2>
                </div>
                {appsLoading ? <PageLoader /> : applications.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-3">📭</p>
                    <h3 className="font-bold text-gray-900 mb-1">No applications yet</h3>
                    <p className="text-gray-500 text-sm">Applications will appear here once candidates apply</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          {['Applicant', 'Applied For', 'Resume', 'Cover Note', 'Date'].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide py-3 px-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-primary-600 font-bold text-sm">
                                    {app.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm">{app.name}</p>
                                  <p className="text-xs text-gray-500">{app.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                                  {app.job?.title ?? 'Unknown'}
                                </p>
                                <p className="text-xs text-gray-500">{app.job?.company}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <a href={app.resumeLink} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                                <FileText className="w-3.5 h-3.5" />
                                View Resume
                              </a>
                            </td>
                            <td className="py-4 px-4 max-w-[200px]">
                              {app.coverNote ? (
                                <p className="text-xs text-gray-500 truncate" title={app.coverNote}>
                                  {app.coverNote}
                                </p>
                              ) : (
                                <span className="text-xs text-gray-300 italic">None provided</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-xs text-gray-500 whitespace-nowrap">
                                {new Date(app.createdAt).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric',
                                })}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── POST JOB TAB ── */}
          {tab === 'post' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900">Post a New Job</h1>
                <p className="text-gray-500 text-sm mt-0.5">Fill in the details to publish a new listing</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl">
                {formErrors.submit && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{formErrors.submit}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={styles.fieldLabel}>Job Title <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. Senior Frontend Developer"
                      value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                      className={formErrors.title ? styles.fieldInputError : styles.fieldInput} />
                    {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Company <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. Google"
                      value={form.company} onChange={(e) => setForm({...form, company: e.target.value})}
                      className={formErrors.company ? styles.fieldInputError : styles.fieldInput} />
                    {formErrors.company && <p className="text-xs text-red-500 mt-1">{formErrors.company}</p>}
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Location <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. San Francisco, US"
                      value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
                      className={formErrors.location ? styles.fieldInputError : styles.fieldInput} />
                    {formErrors.location && <p className="text-xs text-red-500 mt-1">{formErrors.location}</p>}
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Category <span className="text-red-500">*</span></label>
                    <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                      className={formErrors.category ? styles.fieldInputError : styles.fieldInput}>
                      <option value="">Select a category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {formErrors.category && <p className="text-xs text-red-500 mt-1">{formErrors.category}</p>}
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Job Type</label>
                    <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}
                      className={styles.fieldInput}>
                      {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Salary <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input type="text" placeholder="e.g. $80,000 – $120,000"
                      value={form.salary} onChange={(e) => setForm({...form, salary: e.target.value})}
                      className={styles.fieldInput} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={styles.fieldLabel}>Description <span className="text-red-500">*</span></label>
                    <textarea rows={5} placeholder="Describe the role and responsibilities..."
                      value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                      className={cn(formErrors.description ? styles.fieldInputError : styles.fieldInput, 'resize-none')} />
                    {formErrors.description && <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={styles.fieldLabel}>Requirements <span className="text-gray-400 font-normal">(optional — one per line)</span></label>
                    <textarea rows={4} placeholder="3+ years of React experience&#10;Strong TypeScript skills"
                      value={form.requirements} onChange={(e) => setForm({...form, requirements: e.target.value})}
                      className={cn(styles.fieldInput, 'resize-none')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input type="checkbox" checked={form.featured}
                        onChange={(e) => setForm({...form, featured: e.target.checked})}
                        className="w-4 h-4 rounded border-gray-300 accent-primary-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Mark as featured <span className="text-gray-400 font-normal">(shows on homepage)</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                  <button onClick={handlePost} disabled={createMutation.isPending} className={styles.btnPrimary}>
                    {createMutation.isPending
                      ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Posting...</>
                      : <><Plus className="w-4 h-4" /> Publish Job</>}
                  </button>
                  <button onClick={() => { setForm(EMPTY_FORM); setFormErrors({}) }} className={styles.btnGhost}>
                    Reset
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Edit modal */}
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
