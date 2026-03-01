'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JobCard from '@/components/jobs/JobCard'
import CategoryCard from '@/components/jobs/CategoryCard'
import { JobCardSkeleton, JobListSkeleton } from '@/components/jobs/JobCardSkeleton'
import { jobsApi } from '@/lib/api'
import heroPattern from '@/public/hero-pattern.png'
import heroPerson from '@/public/hero-person.png'

const STATIC_CATEGORIES = [
  { name: 'Design',         staticCount: 235 },
  { name: 'Sales',          staticCount: 756 },
  { name: 'Marketing',      staticCount: 140 },
  { name: 'Finance',        staticCount: 325 },
  { name: 'Technology',     staticCount: 436 },
  { name: 'Engineering',    staticCount: 542 },
  { name: 'Business',       staticCount: 211 },
  { name: 'Human Resource', staticCount: 346 },
]

const COMPANIES = ['Vodafone', 'Intel', 'TESLA', 'AMDA', 'Talkit']
const CONTAINER = 'max-w-[1440px] mx-auto px-[125px]'

export default function HomePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const locationRef = useRef<HTMLDivElement>(null)

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

  // Extract unique locations from all jobs
  const allLocations: string[] = Array.from(
    new Set((latestData?.data ?? []).map((j) => j.location))
  ).sort()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (location) params.set('location', location)
    router.push(`/jobs?${params.toString()}`)
  }

  const featuredJobs = featuredData?.data ?? []
  const latestJobs = latestData?.data?.slice(0, 6) ?? []

  const categories = STATIC_CATEGORIES.map((c) => {
    const live = categoryData?.data?.find((d) => d.name === c.name)
    return { name: c.name, count: live?.count ?? c.staticCount }
  })

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FD] relative min-h-[520px]">
        <div className={`${CONTAINER} relative flex items-center`}>

          {/* Left — text content */}
          <div className="relative z-10 py-16 w-full max-w-[520px]">
            <h1 className="text-[56px] font-black text-gray-900 leading-[1.1] mb-2">
              Discover<br />more than
            </h1>
            <h1 className="text-[56px] font-black text-[#26A4FF] leading-[1.1]">
              5000+ Jobs
            </h1>
            <svg viewBox="0 0 320 14" className="w-64 mt-1 mb-6" fill="none">
              <path d="M4 10 Q80 4 160 8 Q240 12 316 6" stroke="#26A4FF" strokeWidth="3" strokeLinecap="round" />
              <path d="M4 12 Q80 6 160 10 Q240 14 316 8" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            </svg>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
              Great platform for the job seeker that searching for
              new career heights and passionate about startups.
            </p>

            {/* ── Search bar ── */}
            <div className="bg-white shadow-md border border-gray-100 flex flex-col sm:flex-row max-w-[580px] z-100">

              {/* Job title input */}
              <div className="flex items-center gap-2 px-5 py-4 flex-1 sm:border-r border-b sm:border-b-0 border-gray-100 min-w-0">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent min-w-0"
                />
              </div>

              {/* Location dropdown */}
              <div ref={locationRef} className="relative sm:w-[200px] flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setLocationOpen((v) => !v)}
                  className="w-full flex items-center gap-2 px-5 py-4 sm:border-r border-b sm:border-b-0 border-gray-100 text-left"
                >
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className={`flex-1 text-sm truncate ${location ? 'text-gray-700' : 'text-gray-400'}`}>
                    {location || 'Location'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown list */}
                {locationOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 shadow-lg z-50 max-h-52 overflow-y-auto">
                    {/* Clear option */}
                    <button
                      onClick={() => { setLocation(''); setLocationOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50 border-b border-gray-50 italic"
                    >
                      All locations
                    </button>
                    {allLocations.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-400">Loading locations...</div>
                    ) : (
                      allLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => { setLocation(loc); setLocationOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                            location === loc ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {loc}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="bg-primary-500 text-white px-7 py-4 font-semibold text-sm hover:bg-primary-600 active:bg-primary-700 transition-colors whitespace-nowrap flex-shrink-0"
              >
                Search my job
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-3">
              <span className="font-medium text-gray-500">Popular:</span>{' '}
              UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          {/* Right — pattern + person images */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[100%] pointer-events-none select-none">
            <Image
              src={heroPattern}
              alt=""
              fill
              className="object-contain object-right"
              priority
            />
            <div className="absolute bottom-0 right-[10%] h-[80%] w-auto">
              <Image
                src={heroPerson}
                alt="Job seeker"
                height={540}
                width={420}
                className="h-full w-auto object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Company logos ─────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 py-8 bg-white">
        <div className={CONTAINER}>
          <p className="text-sm text-gray-400 mb-5">Companies we helped grow</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-14">
            {COMPANIES.map((c) => (
              <span key={c} className="text-gray-400 font-bold text-lg tracking-wider hover:text-gray-600 transition-colors cursor-default select-none">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore by category ───────────────────────────────────────── */}
      <section className="py-16">
        <div className={CONTAINER}>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900">
              Explore by <span className="text-[#26A4FF]">category</span>
            </h2>
            <Link href="/jobs" className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} name={cat.name} count={cat.count} active={i === 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="py-8">
        <div className={CONTAINER}>
          <div className="bg-primary-500 rounded-2xl px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-2 leading-tight">
                Start posting<br />jobs today
              </h2>
              <p className="text-blue-200 text-sm">Start posting jobs for only $10.</p>
            </div>
            <div className="relative z-10">
              <Link href="/admin" className="bg-white text-primary-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap block">
                Sign Up For Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured jobs ─────────────────────────────────────────────── */}
      <section className="py-12">
        <div className={CONTAINER}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              Featured <span className="text-[#26A4FF]">jobs</span>
            </h2>
            <Link href="/jobs" className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all">
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

      {/* ── Latest jobs ───────────────────────────────────────────────── */}
      <section className="py-12 bg-[#F8F8FD] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none opacity-20 select-none">
          <svg viewBox="0 0 300 300">
            <line x1="50"  y1="300" x2="300" y2="50"  stroke="#3B3FDD" strokeWidth="1.5" />
            <line x1="100" y1="300" x2="300" y2="100" stroke="#3B3FDD" strokeWidth="1.5" />
            <line x1="150" y1="300" x2="300" y2="150" stroke="#3B3FDD" strokeWidth="1.5" />
            <line x1="200" y1="300" x2="300" y2="200" stroke="#3B3FDD" strokeWidth="1.5" />
          </svg>
        </div>
        <div className={CONTAINER}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">
              Latest <span className="text-[#26A4FF]">jobs open</span>
            </h2>
            <Link href="/jobs" className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestLoading
              ? Array.from({ length: 6 }).map((_, i) => <JobListSkeleton key={i} />)
              : latestJobs.map((job) => <JobCard key={job.id} job={job} variant="list" />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}