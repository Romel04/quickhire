'use client'

import { useState } from 'react'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { jobsApi, CreateJobData, Job } from '@/lib/api'
import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource']
const JOB_TYPES  = ['Full-Time','Part-Time','Remote','Contract','Internship']

export default function EditJobModal({ job, onClose }: { job: Job; onClose: () => void }) {
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