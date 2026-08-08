"use client";

import {Smartphone} from "lucide-react";

import {Button} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";

interface ChangePhoneCardProps {
    onOpen: () => void;
}

export default function ChangePhoneCard({onOpen}: ChangePhoneCardProps) {
    const {user} = useAuth();
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-lg border p-2">
                        <Smartphone className="size-5" />
                    </div>

                    <div>
                        <CardTitle>رقم الهاتف</CardTitle>

                        <CardDescription>
                            رقم الهاتف يستخدم لتسجيل الدخول إلى النظام.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                <div>
                    <p className="text-sm text-muted-foreground">
                        رقم الهاتف الحالي
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        {user?.phone_number}
                    </p>
                </div>

                <div className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-sm text-muted-foreground">
                        عند تغيير رقم الهاتف سيتم إرسال رمز تحقق إلى الرقم
                        الجديد، ولن يتم تغيير الرقم إلا بعد إدخال رمز التحقق
                        بنجاح.
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button onClick={onOpen}>تغيير رقم الهاتف</Button>
                </div>
            </CardContent>
        </Card>
    );
}
