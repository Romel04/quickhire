import { cn } from '@/lib/utils'

interface CompanyLogoProps {
  company: string
  logoUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Deterministic color per company name
const COLORS = [
  'bg-violet-600',
  'bg-blue-600',
  'bg-teal-600',
  'bg-rose-600',
  'bg-orange-600',
  'bg-green-600',
  'bg-indigo-600',
  'bg-pink-600',
  'bg-cyan-600',
  'bg-amber-600',
]

function getColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORS[Math.abs(hash) % COLORS.length]
}

const SIZE = {
  sm: 'w-10 h-10 text-sm font-bold rounded-xl',
  md: 'w-12 h-12 text-base font-bold rounded-xl',
  lg: 'w-16 h-16 text-xl font-bold rounded-2xl',
}

export default function CompanyLogo({
  company,
  logoUrl,
  size = 'md',
  className,
}: CompanyLogoProps) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={company}
        className={cn(SIZE[size], 'object-contain flex-shrink-0', className)}
      />
    )
  }

  return (
    <div
      className={cn(
        SIZE[size],
        getColor(company),
        'text-white flex items-center justify-center flex-shrink-0',
        className,
      )}
    >
      {company.charAt(0).toUpperCase()}
    </div>
  )
}
