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

interface Props {
    onOpen: () => void;
}

export default function ChangePasswordCard({onOpen}: Props) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-lg border p-2">
                        <LockKeyhole className="size-5" />
                    </div>

                    <div>
                        <CardTitle>كلمة المرور</CardTitle>

                        <CardDescription>
                            قم بتغيير كلمة المرور الخاصة بحسابك.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex justify-end">
                <Button onClick={onOpen}>تغيير كلمة المرور</Button>
            </CardContent>
        </Card>
    );
}
