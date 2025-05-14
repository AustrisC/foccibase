import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="min-w-[320px] flex-1">
          {/* Category Title Skeleton */}
          <div className="flex items-center justify-between group mb-4">
            <Skeleton className="h-8 w-32" />
          </div>
          {/* Product Buttons Skeleton */}
          <div className="flex flex-col gap-1.5 mb-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="h-8 w-full rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
