import {Skeleton} from "@/components/ui/skeleton";

export default function AdvertisementFormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-72" />
            </div>

            <Skeleton className="mx-auto h-52 w-52 rounded-xl" />

            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </div>

            <div className="flex justify-end gap-3">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    );
}