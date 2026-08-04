import {Skeleton} from "@/components/ui/skeleton";

export default function DepartmentFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* عنوان الصفحة */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
            </div>

            {/* النموذج */}
            <div className="rounded-xl border p-6">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* صورة القسم */}
                    <div className="flex justify-center lg:w-1/3">
                        <Skeleton className="h-56 w-56 rounded-xl" />
                    </div>

                    {/* الحقول */}
                    <div className="flex-1 space-y-6">
                        {/* Label */}
                        <Skeleton className="h-4 w-28" />

                        {/* Input */}
                        <Skeleton className="h-10 w-full rounded-md" />

                        {/* مساحة إضافية حتى يشبه الفورم */}
                        <Skeleton className="h-10 w-full rounded-md opacity-0" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex justify-end gap-3">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </div>
        </div>
    );
}
