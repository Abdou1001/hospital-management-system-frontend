import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* العنوان */}
            <Skeleton className="h-9 w-44" />

            {/* البطاقات */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({length: 4}).map((_, index) => (
                    <Skeleton key={index} className="h-32 rounded-xl" />
                ))}
            </div>

            {/* الشارت */}
            <Skeleton className="h-[420px] w-full rounded-xl" />
        </div>
    );
}
