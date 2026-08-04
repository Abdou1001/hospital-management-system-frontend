"use client";

import Image from "next/image";
import {Search} from "lucide-react";

import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface Props {
    appointment: any;
}

export default function PaymentReceiptCard({appointment}: Props) {
    if (!appointment.payment_receipt) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>إيصال الدفع</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                        لا يوجد إيصال مرفق
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>إيصال الدفع</CardTitle>
            </CardHeader>

            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="group relative mx-auto h-[450px] w-full cursor-zoom-in overflow-hidden rounded-xl border">
                            <Image
                                src={appointment.payment_receipt}
                                alt="Payment Receipt"
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                <div className="rounded-full bg-white/90 p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                    <Search className="size-6 text-black" />
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="h-[95vh] w-[95vw] max-w-7xl p-2">
                        <div className="relative h-full w-full">
                            <Image
                                src={appointment.payment_receipt}
                                alt="Payment Receipt"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
