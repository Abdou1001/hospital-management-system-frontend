import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export default function AppointmentDetailsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-4 w-72" />
                </div>

                <Skeleton className="h-10 w-24 rounded-md" />
            </div>

            {/* Cards */}
            <div className="grid gap-6 xl:grid-cols-3">
                <PatientSkeleton />

                <DoctorSkeleton />

                <AppointmentSkeleton />
            </div>

            {/* Receipt */}
            <ReceiptSkeleton />
        </div>
    );
}

function PatientSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-5">
                {Array.from({length: 5}).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function DoctorSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="size-24 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </CardContent>
        </Card>
    );
}

function AppointmentSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-5">
                {Array.from({length: 6}).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function ReceiptSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-36" />
            </CardHeader>

            <CardContent>
                <Skeleton className="h-[450px] w-full rounded-xl" />
            </CardContent>
        </Card>
    );
}
