import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const HospitalSkeleton = () => {
    return (
        <Card className="mx-auto w-full max-w-4xl shadow-sm">
            <CardHeader className="space-y-3">
                <Skeleton className="h-8 w-56 rounded-md" />
                <Skeleton className="h-4 w-72 rounded-md" />
            </CardHeader>

            <CardContent>
                <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* Image Section */}
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="h-56 w-56 rounded-xl" />
                        <Skeleton className="h-10 w-36 rounded-md" />
                    </div>

                    {/* Form Section */}
                    <div className="space-y-6">
                        {/* Hospital Name */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        {/* Save Button */}
                        <Skeleton className="mt-4 h-11 w-full rounded-md" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HospitalSkeleton;
