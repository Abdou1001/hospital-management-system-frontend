"use client";

import {ReactNode, useState} from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {Loader2} from "lucide-react";

import {useDeleteAd} from "@/hooks/ads/useDeleteAd";

interface DeleteAdvertisementDialogProps {
    adId: number;
    children: ReactNode;
}

export default function DeleteAdvertisementDialog({
    adId,
    children,
}: DeleteAdvertisementDialogProps) {
    const [open, setOpen] = useState(false);

    const {mutate, isPending} = useDeleteAd();

    const handleDelete = () => {
        mutate(adId, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent dir="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle>حذف الإعلان</AlertDialogTitle>

                    <AlertDialogDescription>
                        هل أنت متأكد من حذف هذا الإعلان؟
                        <br />
                        لا يمكن التراجع عن هذه العملية.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        إلغاء
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                جاري الحذف...
                            </>
                        ) : (
                            "حذف"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
