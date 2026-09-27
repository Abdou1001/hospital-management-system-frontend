import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function BankAccountsSkeleton() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-5 space-y-4">
                    <CardContent className="p-0 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-14 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <Skeleton className="size-8 rounded-md" />
                                <Skeleton className="size-8 rounded-md" />
                                <Skeleton className="size-8 rounded-md" />
                            </div>
                        </div>
                        <Skeleton className="h-14 w-full rounded-lg" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
