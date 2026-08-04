import {Skeleton} from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
    rows?: number;
    columns?: number;
}

export function DataTableSkeleton({
    rows = 8,
    columns = 8,
}: DataTableSkeletonProps) {
    return (
        <div className="rounded-lg border">
            {/* Header */}
            <div className="border-b p-4">
                <Skeleton className="h-6 w-48" />
            </div>

            {/* Table */}
            <div className="p-4">
                <div className="space-y-4">
                    {Array.from({length: rows}).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid gap-4"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                            }}>
                            {Array.from({length: columns}).map(
                                (_, columnIndex) => (
                                    <Skeleton
                                        key={columnIndex}
                                        className="h-10 w-full"
                                    />
                                ),
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t p-4">
                <Skeleton className="h-5 w-32" />

                <div className="flex gap-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                </div>
            </div>
        </div>
    );
}
