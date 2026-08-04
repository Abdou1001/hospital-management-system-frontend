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

import {useToggleDoctorHidden} from "@/hooks/doctors/useToggleDoctorHidden";

interface HideDoctorDialogProps {
    doctor: Doctor;
}

export function HideDoctorDialog({doctor}: HideDoctorDialogProps) {
    const toggleHidden = useToggleDoctorHidden();

    const isHidden = doctor.is_hidden;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="justify-center">
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className={isHidden ? "text-green-600" : "text-red-600"}>
                    {isHidden ? "إظهار الطبيب" : "إخفاء الطبيب"}
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isHidden ? "إظهار الطبيب" : "إخفاء الطبيب"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {isHidden
                            ? "هل تريد إظهار الطبيب مرة أخرى؟"
                            : "هل تريد إخفاء الطبيب؟"}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => toggleHidden.mutate(doctor.doctor_id)}>
                        {isHidden ? "إظهار" : "إخفاء"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
