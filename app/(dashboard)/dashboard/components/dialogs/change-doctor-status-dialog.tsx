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

import {Doctor} from "@/validation/doctors/schemas/doctor.schema";
import {useToggleDoctorStatus} from "@/hooks/doctors/useToggleDoctorStatus";

interface ChangeStatusDialogProps {
    doctor: Doctor;
}

export function ChangeStatusDialog({doctor}: ChangeStatusDialogProps) {
    const changeStatus = useToggleDoctorStatus();

    const isActive = doctor.status === "active";

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="justify-center">
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className={isActive ? "text-red-600" : "text-green-600"}>
                    {isActive ? "تعطيل الطبيب" : "تفعيل الطبيب"}
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isActive ? "تعطيل الطبيب" : "تفعيل الطبيب"}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-right">
                        {isActive
                            ? "هل أنت متأكد من تعطيل هذا الطبيب؟ لن يتمكن المرضى من الحجز لديه."
                            : "هل أنت متأكد من تفعيل هذا الطبيب؟ سيتمكن المرضى من الحجز لديه."}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => changeStatus.mutate(doctor.doctor_id)}>
                        {isActive ? "تعطيل" : "تفعيل"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
