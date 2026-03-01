'use client'

import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jobsApi, CreateJobData } from '@/lib/api'
import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource']
const JOB_TYPES  = ['Full-Time','Part-Time','Remote','Contract','Internship']
const EMPTY_FORM: CreateJobData = {
  title:'', company:'', location:'', category:'',
  type:'Full-Time', description:'', requirements:'', salary:'', featured:false,
}

interface Props {
  onSuccess: (msg: string) => void
  onSwitchToJobs: () => void
}

export default function PostJobForm({ onSuccess, onSwitchToJobs }: Props) {
  const queryClient = useQueryClient()
  const [form, setForm]     = useState<CreateJobData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const createMutation = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setForm(EMPTY_FORM)
      setErrors({})
      onSwitchToJobs()
      onSuccess(`"${res.data.data.title}" posted successfully!`)
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e?.response?.data?.message ?? 'Failed to create job'
      setErrors({ submit: Array.isArray(msg) ? msg.join(', ') : msg })
    },
  })

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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl">
      {errors.submit && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={styles.fieldLabel}>Job Title <span className="text-red-500">*</span></label>
          <input type="text" placeholder="e.g. Senior Frontend Developer"
            value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
            className={errors.title ? styles.fieldInputError : styles.fieldInput} />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className={styles.fieldLabel}>Company <span className="text-red-500">*</span></label>
          <input type="text" placeholder="e.g. Google"
            value={form.company} onChange={(e) => setForm({...form, company: e.target.value})}
            className={errors.company ? styles.fieldInputError : styles.fieldInput} />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>
        <div>
          <label className={styles.fieldLabel}>Location <span className="text-red-500">*</span></label>
          <input type="text" placeholder="e.g. San Francisco, US"
            value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
            className={errors.location ? styles.fieldInputError : styles.fieldInput} />
          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
        </div>
        <div>
          <label className={styles.fieldLabel}>Category <span className="text-red-500">*</span></label>
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
            className={errors.category ? styles.fieldInputError : styles.fieldInput}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
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
            className={cn(errors.description ? styles.fieldInputError : styles.fieldInput, 'resize-none')} />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={styles.fieldLabel}>Requirements <span className="text-gray-400 font-normal">(optional — one per line)</span></label>
          <textarea rows={4} placeholder={"3+ years of React experience\nStrong TypeScript skills"}
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
        <button onClick={() => { setForm(EMPTY_FORM); setErrors({}) }} className={styles.btnGhost}>
          Reset
        </button>
      </div>
    </div>
  )
}