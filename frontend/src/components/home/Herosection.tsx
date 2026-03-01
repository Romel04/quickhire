"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api";
import Image from "next/image";

const heroPattern = "/hero-pattern.png";
const heroPerson = "/hero-person.png";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const { data: allJobsData } = useQuery({
    queryKey: ["all-jobs-locations"],
    queryFn: () => jobsApi.getAll().then((r) => r.data),
  });

  const allLocations: string[] = Array.from(
    new Set((allJobsData?.data ?? []).map((j) => j.location)),
  ).sort();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="bg-[#F8F8FD] relative min-h-[520px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px] relative flex items-center">
        {/* Left — text content */}
        <div className="relative z-10 py-16 w-full max-w-[520px]">
          <h1 className="font-heading text-[60px] font-bold text-gray-900 leading-[1.1] mb-2">
            Discover
            <br />
            more than
          </h1>
          <h1 className="font-heading text-[60px] font-bold text-[#26A4FF] leading-[1.1]">
            5000+ Jobs
          </h1>
          <svg viewBox="0 0 320 14" className="w-64 mt-1 mb-6" fill="none">
            <path
              d="M4 10 Q80 4 160 8 Q240 12 316 6"
              stroke="#26A4FF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 12 Q80 6 160 10 Q240 14 316 8"
              stroke="#26A4FF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>

          <p className="font-heading text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search bar */}
          <div className="bg-white shadow-md border border-gray-100 flex flex-col sm:flex-row max-w-[580px]">
            {/* Job title */}
            <div className="flex items-center gap-2 px-5 py-4 flex-1 sm:border-r border-b sm:border-b-0 border-gray-100 min-w-0">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent min-w-0"
              />
            </div>

            {/* Location dropdown */}
            <div
              ref={locationRef}
              className="relative sm:w-[200px] flex-shrink-0"
            >
              <button
                type="button"
                onClick={() => setLocationOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-5 py-4 sm:border-r border-b sm:border-b-0 border-gray-100 text-left"
              >
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span
                  className={`flex-1 text-sm truncate ${location ? "text-gray-700" : "text-gray-400"}`}
                >
                  {location || "Location"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`}
                />
              </button>

              {locationOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 shadow-xl z-50 max-h-52 overflow-y-auto">
                  <button
                    onClick={() => {
                      setLocation("");
                      setLocationOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50 border-b border-gray-100 italic"
                  >
                    All locations
                  </button>
                  {allLocations.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-400">
                      Loading...
                    </div>
                  ) : (
                    allLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                          location === loc
                            ? "bg-primary-50 text-primary-600 font-medium"
                            : "text-gray-700"
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
            <span className="font-medium text-gray-500">Popular:</span> UI
            Designer, UX Researcher, Android, Admin
          </p>
        </div>

        {/* Right — pattern + person */}
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
  );
}
