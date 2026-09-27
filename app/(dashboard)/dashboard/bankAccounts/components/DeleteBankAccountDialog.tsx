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
import {useDeleteBankAccount} from "@/hooks/bank-accounts/useDeleteBankAccount";

interface DeleteBankAccountDialogProps {
    accountId: number;
    children: ReactNode;
}

export default function DeleteBankAccountDialog({
    accountId,
    children,
}: DeleteBankAccountDialogProps) {
    const [open, setOpen] = useState(false);
    const {mutate, isPending} = useDeleteBankAccount();

    const handleDelete = () => {
        mutate(accountId, {
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
                    <AlertDialogTitle>حذف الحساب البنكي</AlertDialogTitle>
                    <AlertDialogDescription>
                        هل أنت متأكد من حذف هذا الحساب البنكي؟
                        <br />
                        لا يمكن التراجع عن هذه العملية بعد التأكيد.
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
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                جاري الحذف...
                            </>
                        ) : (
                            "تأكيد الحذف"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
