'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, MapPin, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JobCard from '@/components/jobs/JobCard'
import CategoryCard from '@/components/jobs/CategoryCard'
import { JobCardSkeleton, JobListSkeleton } from '@/components/jobs/JobCardSkeleton'
import { jobsApi } from '@/lib/api'

const STATIC_CATEGORIES = [
  { name: 'Design',           staticCount: 235 },
  { name: 'Sales',            staticCount: 756 },
  { name: 'Marketing',        staticCount: 140 },
  { name: 'Finance',          staticCount: 325 },
  { name: 'Technology',       staticCount: 436 },
  { name: 'Engineering',      staticCount: 542 },
  { name: 'Business',         staticCount: 211 },
  { name: 'Human Resource',   staticCount: 346 },
]

const COMPANIES = ['Vodafone', 'Intel', 'TESLA', 'AMDA', 'Talkit']

export default function HomePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const { data: featuredData, isLoading: featuredLoading } = useQuery({
    queryKey: ['featured-jobs'],
    queryFn: () => jobsApi.getFeatured().then((r) => r.data),
  })

  const { data: latestData, isLoading: latestLoading } = useQuery({
    queryKey: ['latest-jobs'],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => jobsApi.getCategories().then((r) => r.data),
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (location.trim()) params.set('location', location.trim())
    router.push(`/jobs?${params.toString()}`)
  }

  const featuredJobs = featuredData?.data ?? []
  const latestJobs = latestData?.data?.slice(0, 6) ?? []

  // Merge live counts from API into static categories
  const categories = STATIC_CATEGORIES.map((c) => {
    const live = categoryData?.data?.find((d) => d.name === c.name)
    return { name: c.name, count: live?.count ?? c.staticCount }
  })

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-surface relative overflow-hidden">
        {/* Decorative background lines */}
        <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none select-none">
          <svg
            viewBox="0 0 600 500"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect x="200" y="50"  width="300" height="300" fill="none" stroke="#3B3FDD" strokeWidth="1" transform="rotate(15 350 200)"  opacity="0.12" />
            <rect x="250" y="80"  width="250" height="250" fill="none" stroke="#3B3FDD" strokeWidth="1" transform="rotate(25 375 205)"  opacity="0.08" />
            <rect x="300" y="110" width="200" height="200" fill="none" stroke="#3B3FDD" strokeWidth="1" transform="rotate(35 400 210)"  opacity="0.05" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-2">
              Discover<br />
              more than
            </h1>
            <h1 className="text-5xl lg:text-6xl font-black text-accent leading-tight">
              5000+ Jobs
            </h1>
            {/* Brush stroke underline */}
            <svg viewBox="0 0 320 14" className="w-64 mt-1 mb-6" fill="none">
              <path d="M4 10 Q80 4 160 8 Q240 12 316 6" stroke="#26A4FF" strokeWidth="3" strokeLinecap="round" />
              <path d="M4 12 Q80 6 160 10 Q240 14 316 8" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            </svg>

            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Great platform for the job seeker that searching for<br className="hidden sm:block" />
              new career heights and passionate about startups.
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
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary-500 text-white px-8 py-3.5 font-semibold text-sm hover:bg-primary-600 transition-colors whitespace-nowrap"
              >
                Search my job
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-3">
              <span className="font-medium text-gray-500">Popular:</span>{' '}
              UI Designer, UX Researcher, Android, Admin
            </p>
          </div>
        </div>
      </section>

      {/* ── Company logos ────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 mb-5">Companies we helped grow</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-14">
            {COMPANIES.map((c) => (
              <span
                key={c}
                className="text-gray-400 font-bold text-lg tracking-wider hover:text-gray-600 transition-colors cursor-default select-none"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore by category ──────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900">
              Explore by{' '}
              <span className="text-accent">category</span>
            </h2>
            <Link
              href="/jobs"
              className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
            >
              Show all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                count={cat.count}
                active={i === 2} // Marketing highlighted by default like Figma
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-500 rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">
                Start posting<br />jobs today
              </h2>
              <p className="text-blue-200 text-sm">Start posting jobs for only $10.</p>
            </div>
            <Link
              href="/admin"
              className="bg-white text-primary-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured jobs ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              Featured <span className="text-accent">jobs</span>
            </h2>
            <Link
              href="/jobs"
              className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
            >
              Show all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredLoading
              ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
              : featuredJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      {/* ── Latest jobs ──────────────────────────────────────────────── */}
      <section className="py-12 bg-surface relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none opacity-30 select-none">
          <svg viewBox="0 0 300 300">
            <line x1="50"  y1="300" x2="300" y2="50"  stroke="#3B3FDD" strokeWidth="1" />
            <line x1="100" y1="300" x2="300" y2="100" stroke="#3B3FDD" strokeWidth="1" />
            <line x1="150" y1="300" x2="300" y2="150" stroke="#3B3FDD" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              Latest <span className="text-accent">jobs open</span>
            </h2>
            <Link
              href="/jobs"
              className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
            >
              Show all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestLoading
              ? Array.from({ length: 6 }).map((_, i) => <JobListSkeleton key={i} />)
              : latestJobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="list" />
                ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
