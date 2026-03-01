"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/jobs/JobCard";
import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton";
import { jobsApi } from "@/lib/api";

export default function FeaturedJobs() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-jobs"],
    queryFn: () => jobsApi.getFeatured().then((r) => r.data),
  });

  const jobs = data?.data ?? [];

  return (
    <section className="py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-900">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))
            : jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </section>
  );
}
