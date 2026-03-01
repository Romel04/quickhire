export function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <div className="w-20 h-6 bg-gray-200 rounded" />
      </div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
      <div className="h-6 bg-gray-200 rounded-full w-24" />
    </div>
  )
}

export function JobListSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 animate-pulse flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-5 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  )
}
