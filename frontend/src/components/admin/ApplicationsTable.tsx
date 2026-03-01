'use client'

import { FileText } from 'lucide-react'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { Application } from '@/lib/api'

interface Props {
  applications: Application[]
  isLoading: boolean
}

export default function ApplicationsTable({ applications, isLoading }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900">Applications</h2>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : applications.length === 0 ? (
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
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                      {app.job?.title ?? 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500">{app.job?.company}</p>
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
                      <p className="text-xs text-gray-500 truncate" title={app.coverNote}>{app.coverNote}</p>
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
  )
}