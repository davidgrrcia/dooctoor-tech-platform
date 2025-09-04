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
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
          >
            {/* Avatar and Name Section */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="mb-1 h-5 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Member Information */}
            <div className="hidden items-center gap-8 md:flex">
              <div className="text-left">
                <Skeleton className="mb-1 h-3 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="text-left">
                <Skeleton className="mb-1 h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="text-left">
                <Skeleton className="mb-1 h-3 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Button */}
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
