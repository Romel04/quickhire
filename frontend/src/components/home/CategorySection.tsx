import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/jobs/CategoryCard";

const STATIC_CATEGORIES = [
  { name: "Design", staticCount: 235 },
  { name: "Sales", staticCount: 756 },
  { name: "Marketing", staticCount: 140 },
  { name: "Finance", staticCount: 325 },
  { name: "Technology", staticCount: 436 },
  { name: "Engineering", staticCount: 542 },
  { name: "Business", staticCount: 211 },
  { name: "Human Resource", staticCount: 346 },
];

interface Props {
  liveCounts?: { name: string; count: number }[];
}

export default function CategorySection({ liveCounts }: Props) {
  const categories = STATIC_CATEGORIES.map((c) => {
    const live = liveCounts?.find((d) => d.name === c.name);
    return { name: c.name, count: live?.count ?? c.staticCount };
  });

  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl font-bold text-gray-900">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
          >
            Show all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              active={i === 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
