'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, MapPin, X, SlidersHorizontal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JobCard from '@/components/jobs/JobCard'
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton'
import { jobsApi } from '@/lib/api'
import { styles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'All',
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Technology',
  'Engineering',
  'Business',
  'Human Resource',
]

const JOB_TYPES = ['All', 'Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship']

function JobsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch]     = useState(searchParams.get('search') ?? '')
  const [location, setLocation] = useState(searchParams.get('location') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? '')
  const [type, setType]         = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', search, location, category, type],
    queryFn: () =>
      jobsApi
        .getAll({
          search:   search || undefined,
          location: location || undefined,
          category: category === 'All' || !category ? undefined : category,
          type:     type === 'All' || !type ? undefined : type,
        })
        .then((r) => r.data),
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (location) params.set('location', location)
    if (category && category !== 'All') params.set('category', category)
    router.replace(`/jobs?${params.toString()}`, { scroll: false })
  }

  const clearAll = () => {
    setSearch('')
    setLocation('')
    setCategory('')
    setType('')
    router.replace('/jobs', { scroll: false })
  }

  const hasFilters =
    search || location || (category && category !== 'All') || (type && type !== 'All')

  const jobs = data?.data ?? []

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Page header */}
      <div className="bg-surface border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Find your <span className="text-accent">dream job</span>
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {isLoading ? 'Loading...' : `${data?.count ?? 0} jobs available`}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 flex-1 sm:border-r border-b sm:border-b-0 border-gray-100">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 flex-1 sm:border-r border-b sm:border-b-0 border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location (e.g. London)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary-500 text-white px-8 py-3.5 font-semibold text-sm hover:bg-primary-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
          </p>
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={cn(
              'flex-shrink-0 lg:w-56',
              showMobileFilters ? 'block w-full' : 'hidden lg:block',
            )}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-sm">Filters</h3>
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Category
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const active =
                      (cat === 'All' && !category) || category === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat === 'All' ? '' : cat)}
                        className={cn(
                          'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
                          active
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Type */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Job Type
                </p>
                <div className="space-y-1">
                  {JOB_TYPES.map((t) => {
                    const active = (t === 'All' && !type) || type === t
                    return (
                      <button
                        key={t}
                        onClick={() => setType(t === 'All' ? '' : t)}
                        className={cn(
                          'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
                          active
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Jobs grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your search or clearing the filters
                </p>
                <button onClick={clearAll} className={styles.btnPrimary}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="hidden lg:flex items-center mb-5">
                  <p className="text-sm text-gray-500">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
                    {category && category !== 'All' && (
                      <>
                        {' '}in{' '}
                        <span className="font-semibold text-primary-500">{category}</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function JobsPage() {
  return (
    <Suspense>
      <JobsContent />
    </Suspense>
  )
}
