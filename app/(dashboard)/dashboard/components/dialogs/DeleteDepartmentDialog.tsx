"use client";

import {ReactNode, useState} from "react";
import {Loader2} from "lucide-react";

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

import {Department} from "@/validation/departments/schemas/department.schema";
import {useDeleteDepartment} from "@/hooks/departments/useDeleteDepartment";

interface DeleteDepartmentDialogProps {
    department: Department;

    children: ReactNode;
}

export default function DeleteDepartmentDialog({
    department,
    children,
}: DeleteDepartmentDialogProps) {
    // ==========================================
    // التحكم بفتح وإغلاق النافذة
    // ==========================================
    const [open, setOpen] = useState(false);

    // ==========================================
    // Hook حذف القسم
    // ==========================================
    const {mutate: deleteDepartment, isPending} = useDeleteDepartment();

    // ==========================================
    // تنفيذ عملية الحذف
    // ==========================================
    const handleDelete = () => {
        deleteDepartment(department.depart_id, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* الزر الذي يفتح النافذة */}
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            {/* نافذة التأكيد */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>حذف القسم</AlertDialogTitle>

                    <AlertDialogDescription>
                        هل أنت متأكد من حذف قسم{" "}
                        <span className="font-semibold">
                            {department.depart_name}
                        </span>
                        ؟
                        <br />
                        لا يمكن التراجع عن هذه العملية لاحقًا.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {/* إلغاء */}
                    <AlertDialogCancel disabled={isPending}>
                        إلغاء
                    </AlertDialogCancel>

                    {/* تأكيد الحذف */}
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
                        className="bg-destructive hover:bg-destructive/90">
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
