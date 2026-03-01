export function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-200" />
        <div className="w-20 h-6 bg-gray-200" />
      </div>
      <div className="h-5 bg-gray-200  w-3/4 mb-2" />
      <div className="h-4 bg-gray-200  w-1/2 mb-4" />
      <div className="h-4 bg-gray-200  w-full mb-2" />
      <div className="h-4 bg-gray-200  w-5/6 mb-4" />
      <div className="h-6 bg-gray-200 w-24" />
    </div>
  );
}

export function JobListSkeleton() {
  return (
    <div className="bg-white border border-gray-100 p-4 animate-pulse flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-200 flex-shrink-0" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200  w-1/2 mb-2" />
        <div className="h-3 bg-gray-200  w-1/3 mb-2" />
        <div className="h-5 bg-gray-200 w-20" />
      </div>
    </div>
  );
}
