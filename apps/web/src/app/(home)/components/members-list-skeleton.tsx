import { Skeleton } from "@repo/ui/components/ui/skeleton";

export function MembersListSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-1 h-4 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-64 rounded-md" />
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center rounded-lg border border-gray-200 bg-white p-4"
          >
            {/* Avatar and Name Section - Increased Width */}
            <div className="flex w-96 items-center gap-4">
              <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-1 h-5 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Member Information - Adjusted Column Widths */}
            <div className="hidden flex-1 items-center gap-6 md:flex">
              <div className="w-64 text-left">
                <Skeleton className="mb-1 h-3 w-12" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="w-40 text-left">
                <Skeleton className="mb-1 h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="w-24 text-left">
                <Skeleton className="mb-1 h-3 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Button - Fixed Width */}
            <div className="ml-4 flex-shrink-0">
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
