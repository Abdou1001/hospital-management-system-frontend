"use client";

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

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

import {User} from "@/validation/users/schemas/user.schema";
import {useChangeStatusUsers} from "@/hooks/users/useEditUser";

interface ChangeStatusDialogProps {
    user: User;
}

export function ChangeStatusDialog({user}: ChangeStatusDialogProps) {
    const changeStatus = useChangeStatusUsers();

    const isActive = user.is_active === "active";

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="justify-center">
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className={isActive ? "text-red-600" : "text-green-600"}>
                    {isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {isActive
                            ? "هل أنت متأكد من تعطيل هذا الحساب؟"
                            : "هل أنت متأكد من تفعيل هذا الحساب؟"}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            changeStatus.mutate({
                                id: user.user_id,
                            })
                        }>
                        {isActive ? "تعطيل" : "تفعيل"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
