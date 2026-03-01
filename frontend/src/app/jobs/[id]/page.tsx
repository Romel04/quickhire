'use client'

import { useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { MapPin, Briefcase, DollarSign, Users, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CompanyLogo from '@/components/shared/CompanyLogo'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { getCategoryTag, styles } from '@/lib/styles'
import { jobsApi, applicationsApi } from '@/lib/api'
import { cn } from '@/lib/utils'

interface Props { params: Promise<{ id: string }> }
const EMPTY = { name: '', email: '', resumeLink: '', coverNote: '' }

export default function JobDetailPage({ params }: Props) {
  const { id } = use(params)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getById(id).then((r) => r.data),
  })

  const applyMutation = useMutation({
    mutationFn: applicationsApi.submit,
    onSuccess: () => { setSubmitted(true); setErrors({}) },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e?.response?.data?.message ?? 'Something went wrong.'
      setErrors({ submit: Array.isArray(msg) ? msg.join(', ') : msg })
    },
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.resumeLink.trim()) e.resumeLink = 'Resume link is required'
    else { try { new URL(form.resumeLink) } catch { e.resumeLink = 'Please enter a valid URL' } }
    return e
  }

  const handleSubmit = () => {
    const ve = validate()
    if (Object.keys(ve).length) { setErrors(ve); return }
    setErrors({})
    applyMutation.mutate({ jobId: id, ...form })
  }

  if (isLoading) return <><Navbar /><PageLoader /></>

  if (error || !data?.data) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Job not found</h2>
          <Link href="/jobs" className={styles.btnPrimary}>Browse all jobs</Link>
        </div>
        <Footer />
      </>
    )
  }

  const job = data.data

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-[#F8F8FD] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[125px] py-4 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#3B3FDD] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-[#3B3FDD] transition-colors">Jobs</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate">{job.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[125px] py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#3B3FDD] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <div className="flex items-start gap-5 flex-wrap">
                <CompanyLogo company={job.company} logoUrl={job.logoUrl} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h1 className="text-2xl font-black text-gray-900 mb-1">{job.title}</h1>
                      <p className="text-gray-500 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm font-semibold px-4 py-1.5 border-2 border-[#3B3FDD] text-[#3B3FDD] rounded-lg flex-shrink-0">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="w-4 h-4 text-[#3B3FDD]/60" />{job.location}</span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-500"><Briefcase className="w-4 h-4 text-[#3B3FDD]/60" />{job.category}</span>
                    {job.salary && <span className="flex items-center gap-1.5 text-sm text-gray-500"><DollarSign className="w-4 h-4 text-[#3B3FDD]/60" />{job.salary}</span>}
                    <span className="flex items-center gap-1.5 text-sm text-gray-500"><Users className="w-4 h-4 text-[#3B3FDD]/60" />{job._count?.applications ?? 0} applicants</span>
                  </div>
                  <div className="mt-3">
                    <span className={cn(styles.tag, getCategoryTag(job.category))}>{job.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white border border-gray-100 rounded-2xl p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.split('\n').filter(Boolean).map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#3B3FDD] flex-shrink-0 mt-0.5" />
                      <span>{req.replace(/^[•\-]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: apply form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-20">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">Application Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Your application for <span className="font-semibold text-gray-900">{job.title}</span> at <span className="font-semibold text-gray-900">{job.company}</span> has been submitted.
                  </p>
                  <Link href="/jobs" className={cn(styles.btnPrimary, 'w-full justify-center')}>Browse more jobs</Link>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-black text-gray-900 mb-1">Apply Now</h3>
                  <p className="text-sm text-gray-500 mb-5">Applying for <span className="font-medium text-gray-900">{job.title}</span></p>

                  {errors.submit && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className={styles.fieldLabel}>Full Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="John Doe" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={errors.name ? styles.fieldInputError : styles.fieldInput} />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Email Address <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="john@example.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={errors.email ? styles.fieldInputError : styles.fieldInput} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Resume Link <span className="text-red-500">*</span></label>
                      <input type="url" placeholder="https://drive.google.com/..." value={form.resumeLink}
                        onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                        className={errors.resumeLink ? styles.fieldInputError : styles.fieldInput} />
                      {errors.resumeLink && <p className="text-xs text-red-500 mt-1">{errors.resumeLink}</p>}
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Cover Note <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea rows={4} placeholder="Tell us why you are a great fit..."
                        value={form.coverNote}
                        onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                        className={cn(styles.fieldInput, 'resize-none')} />
                    </div>
                    <button onClick={handleSubmit} disabled={applyMutation.isPending}
                      className={cn(styles.btnPrimary, 'w-full justify-center')}>
                      {applyMutation.isPending
                        ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                        : 'Submit Application'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
