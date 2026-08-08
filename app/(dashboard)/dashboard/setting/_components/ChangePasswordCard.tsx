"use client";

import {LockKeyhole} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface ChangePasswordCardProps {
    onOpen: () => void;
}

export default function ChangePasswordCard({onOpen}: ChangePasswordCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
                        <LockKeyhole className="size-5 text-muted-foreground" />
                    </div>

                    <div>
                        <CardTitle>كلمة المرور</CardTitle>

                        <CardDescription>
                            قم بتغيير كلمة المرور الخاصة بحسابك للحفاظ على أمان
                            حسابك.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-sm text-muted-foreground">
                        ننصح بتغيير كلمة المرور بشكل دوري واستخدام كلمة مرور
                        قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز.
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button onClick={onOpen}>تغيير كلمة المرور</Button>
                </div>
            </CardContent>
        </Card>
    );
}
