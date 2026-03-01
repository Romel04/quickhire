import Link from "next/link";
import { MapPin } from "lucide-react";
import { Job } from "@/lib/api";
import { getCategoryTag, styles } from "@/lib/styles";
import CompanyLogo from "@/components/shared/CompanyLogo";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  variant?: "grid" | "list";
}

export default function JobCard({ job, variant = "grid" }: JobCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/jobs/${job.id}`} className="block">
        {/* Added rounded-none here */}
        <div className="flex items-center gap-4 p-4 bg-white border border-[#D6DDEB] hover:shadow-md hover:border-[#3B3FDD]/30 transition-all duration-200 rounded-none">
          <CompanyLogo company={job.company} logoUrl={job.logoUrl} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {job.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {job.company} · {job.location}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* Added rounded-none to the type tag */}
              <span className="text-xs px-2 py-0.5 border border-gray-200 text-gray-600 bg-gray-50 rounded-none">
                {job.type}
              </span>
              {/* Added rounded-none to the category tag */}
              <span
                className={cn(
                  styles.tag,
                  getCategoryTag(job.category),
                  "rounded-none",
                )}
              >
                {job.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/jobs/${job.id}`} className="block h-full">
      <div className={cn(styles.jobCard, "rounded-none")}>
        <div className="flex items-start justify-between mb-4">
          <CompanyLogo company={job.company} logoUrl={job.logoUrl} size="md" />
          <span className="text-xs font-medium px-3 py-1 border border-[#D6DDEB] text-gray-600 flex-shrink-0 rounded-none">
            {job.type}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
          {job.title}
        </h3>
        <p className="font-detail text-sm text-gray-500 mb-3 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {job.company} · {job.location}
        </p>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
          {job.description.split("\n")[0]}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {/* Added rounded-none to the category tag */}
          <span
            className={cn(
              styles.tag,
              "font-detail",
              getCategoryTag(job.category),
            )}
          >
            {job.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
