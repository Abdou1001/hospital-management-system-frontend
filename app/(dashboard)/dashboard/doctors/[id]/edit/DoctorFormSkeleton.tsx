import {Skeleton} from "@/components/ui/skeleton";

export default function DoctorFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-72" />
            </div>

            <div className="rounded-xl border p-6">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Image */}
                    <div className="flex justify-center">
                        <Skeleton className="h-60 w-60 rounded-xl" />
                    </div>

                    {/* Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Email & Phone */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-24 w-full rounded-md" />
                        </div>

                        {/* Education */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Gender & Experience */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Consultation Fee */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Departments */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-24 w-full rounded-md" />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-end gap-3">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </div>
        </div>
    );
}
