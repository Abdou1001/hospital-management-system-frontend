"use client";

import Link from "next/link";

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

import {Doctor} from "@/validation/doctors/schemas/doctor.schema";

interface EditDoctorActionProps {
    doctor: Doctor;
}

export function EditDoctorAction({doctor}: EditDoctorActionProps) {
    return (
        <DropdownMenuItem asChild className="justify-center">
            <Link href={`/dashboard/doctors/${doctor.doctor_id}/edit`}>
                تعديل الطبيب
            </Link>
        </DropdownMenuItem>
    );
}
