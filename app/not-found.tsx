import Link from "next/link";
import {SearchX} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="flex max-w-lg flex-col items-center text-center">
                {/* Icon */}
                <div className="rounded-full bg-muted p-6">
                    <SearchX className="size-16 text-muted-foreground" />
                </div>

                {/* Title */}
                <h1 className="mt-8 text-4xl font-bold tracking-tight">404</h1>

                <h2 className="mt-2 text-2xl font-semibold">
                    الصفحة غير موجودة
                </h2>

                {/* Description */}
                <p className="mt-4 mb-4 text-muted-foreground">
                    يبدو أن الصفحة التي تحاول الوصول إليها غير موجودة، أو ربما
                    تم نقلها أو حذفها.
                </p>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                    <Button asChild>
                        <Link href="/">العودة للرئيسية</Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/dashboard">لوحة التحكم</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
