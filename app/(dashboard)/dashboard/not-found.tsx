"use client";

import Link from "next/link";
import {SearchX} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function DashboardNotFound() {
    return (
        <div className="flex min-h-[100vdh] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-6">
                <SearchX className="size-16 text-muted-foreground" />
            </div>

            <h1 className="mt-6 text-3xl font-bold">الصفحة غير موجودة</h1>

            <p className="mt-3 max-w-md text-muted-foreground">
                يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم حذفها.
            </p>

            <Button asChild className="mt-8">
                <Link href="/dashboard">العودة إلى لوحة التحكم</Link>
            </Button>
        </div>
    );
}
