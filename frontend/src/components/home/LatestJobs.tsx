"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/jobs/JobCard";
import { JobListSkeleton } from "@/components/jobs/JobCardSkeleton";
import { jobsApi } from "@/lib/api";

export default function LatestJobs() {
  const { data, isLoading } = useQuery({
    queryKey: ["latest-jobs"],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  });

  const jobs = data?.data?.slice(0, 6) ?? [];

  return (
    <section className="py-12 bg-[#F8F8FD] relative isolate">
      {/* Decorative lines */}
      <div className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none opacity-20 select-none -z-10">
        <svg viewBox="0 0 300 300">
          <line
            x1="50"
            y1="300"
            x2="300"
            y2="50"
            stroke="#3B3FDD"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="300"
            x2="300"
            y2="100"
            stroke="#3B3FDD"
            strokeWidth="1.5"
          />
          <line
            x1="150"
            y1="300"
            x2="300"
            y2="150"
            stroke="#3B3FDD"
            strokeWidth="1.5"
          />
          <line
            x1="200"
            y1="300"
            x2="300"
            y2="200"
            stroke="#3B3FDD"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px] z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-900">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <JobListSkeleton key={i} />
              ))
            : jobs.map((job) => (
                <JobCard key={job.id} job={job} variant="list" />
              ))}
        </div>
      </div>
    </section>
  );
}
