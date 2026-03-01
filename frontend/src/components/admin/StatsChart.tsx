'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Job } from '@/lib/api'

interface Props {
  jobs: Job[]
}

export default function StatsChart({ jobs }: Props) {
  // Build chart data — applications per job (top 7 by application count)
  const data = [...jobs]
    .sort((a, b) => (b._count?.applications ?? 0) - (a._count?.applications ?? 0))
    .slice(0, 7)
    .map((j) => ({
      name: j.title.length > 14 ? j.title.slice(0, 14) + '…' : j.title,
      Applications: j._count?.applications ?? 0,
    }))

  // Category breakdown
  const categoryMap: Record<string, number> = {}
  jobs.forEach((j) => {
    categoryMap[j.category] = (categoryMap[j.category] ?? 0) + 1
  })
  const categoryData = Object.entries(categoryMap)
    .map(([name, count]) => ({ name: name.length > 10 ? name.slice(0, 10) + '…' : name, Jobs: count }))
    .sort((a, b) => b.Jobs - a.Jobs)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* Applications per job */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900">Applications per Job</h3>
          <p className="text-xs text-gray-400 mt-0.5">Top 7 jobs by application count</p>
        </div>
        {data.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Bar dataKey="Applications" fill="#3B3FDD" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Jobs by category */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900">Jobs by Category</h3>
          <p className="text-xs text-gray-400 mt-0.5">Distribution across categories</p>
        </div>
        {categoryData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Jobs" fill="#26A4FF" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}