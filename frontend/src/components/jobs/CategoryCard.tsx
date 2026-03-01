import Link from 'next/link'
import { ArrowRight, Brush, TrendingUp, Megaphone, DollarSign, Monitor, Code2, Briefcase, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  name: string
  count: number
  active?: boolean
}

const ICONS: Record<string, React.ReactNode> = {
  Design:           <Brush className="w-7 h-7" />,
  Sales:            <TrendingUp className="w-7 h-7" />,
  Marketing:        <Megaphone className="w-7 h-7" />,
  Finance:          <DollarSign className="w-7 h-7" />,
  Technology:       <Monitor className="w-7 h-7" />,
  Engineering:      <Code2 className="w-7 h-7" />,
  Business:         <Briefcase className="w-7 h-7" />,
  'Human Resource': <Users className="w-7 h-7" />,
}

export default function CategoryCard({ name, count, active = false }: CategoryCardProps) {
  return (
    <Link href={`/jobs?category=${encodeURIComponent(name)}`} className="block">
      <div
        className={cn(
          'p-6 rounded-2xl border-2 transition-all duration-200 group',
          active
            ? 'bg-primary-500 border-primary-500 text-white'
            : 'bg-white border-gray-100 hover:border-primary-400 text-gray-900',
        )}
      >
        <div className={cn('mb-4', active ? 'text-white' : 'text-primary-500')}>
          {ICONS[name] ?? <Briefcase className="w-7 h-7" />}
        </div>
        <h3 className={cn('font-bold text-base mb-1', active ? 'text-white' : 'text-gray-900')}>
          {name}
        </h3>
        <p
          className={cn(
            'text-sm flex items-center gap-1',
            active ? 'text-blue-100' : 'text-gray-400',
          )}
        >
          {count} jobs available
          <ArrowRight className="w-3.5 h-3.5" />
        </p>
      </div>
    </Link>
  )
}
