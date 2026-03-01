import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  name: string
  count: number
  active?: boolean
}

const LOGOS: Record<string, string> = {
  Design:           '/category-logos/pencil.png',
  Sales:            '/category-logos/network.png',
  Marketing:        '/category-logos/mic.png',
  Finance:          '/category-logos/money.png',
  Technology:       '/category-logos/monitor.png',
  Engineering:      '/category-logos/code.png',
  Business:         '/category-logos/briefcase.png',
  'Human Resource': '/category-logos/human.png',
}

export default function CategoryCard({ name, count, active = false }: CategoryCardProps) {
  return (
    <Link href={`/jobs?category=${encodeURIComponent(name)}`} className="block">
      <div
        className={cn(
          'p-6 border-2 transition-all duration-300 group',
          active
            ? 'bg-primary-500 border-primary-500 shadow-lg shadow-primary-200'
            : 'bg-white border-gray-100 hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-100'
        )}
      >
        {/* Icon */}
        <div className="mb-4 w-10 h-10 relative transition-transform duration-300 group-hover:scale-110">
          <Image
            src={LOGOS[name] ?? '/category-logos/business.png'}
            alt={name}
            fill
            className={cn(
              'object-contain',
              active ? 'brightness-0 invert' : ''
            )}
          />
        </div>

        <h3 className={cn(
          'font-bold text-base mb-1 transition-colors', 
          active ? 'text-white' : 'text-gray-900 group-hover:text-primary-600'
        )}>
          {name}
        </h3>
        
        <p className={cn(
          'text-sm flex items-center gap-1 transition-colors', 
          active ? 'text-blue-100' : 'text-gray-400'
        )}>
          {count} jobs available
          <ArrowRight className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            "group-hover:translate-x-1" // Makes the arrow slide right on hover
          )} />
        </p>
      </div>
    </Link>
  )
}