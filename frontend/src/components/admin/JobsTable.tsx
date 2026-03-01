'use client'

import Link from 'next/link'
import { Pencil, Trash2, ExternalLink, Plus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CompanyLogo from '@/components/shared/CompanyLogo'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { jobsApi, Job } from '@/lib/api'
import { styles, getCategoryTag } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  jobs: Job[]
  isLoading: boolean
  onEdit: (job: Job) => void
  onPostJob: () => void
  onDeleted: (msg: string) => void
}

export default function JobsTable({ jobs, isLoading, onEdit, onPostJob, onDeleted }: Props) {
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const deleteMutation = useMutation({
    mutationFn: jobsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] })
      setDeleteId(null)
      onDeleted('Job deleted successfully.')
    },
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">All Jobs</h2>
        <span className="text-sm text-gray-400">{jobs.length} total</span>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <h3 className="font-bold text-gray-900 mb-2">No jobs yet</h3>
          <button onClick={onPostJob} className={cn(styles.btnPrimary, 'mt-2')}>
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
                    <span className="text-sm font-semibold text-primary-500">
                      {job._count?.applications ?? 0}
                    </span>
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
                      <button onClick={() => onEdit(job)}
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
  )
}