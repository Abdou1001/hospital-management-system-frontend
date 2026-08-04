"use client";

import Link from "next/link";

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

import {Doctor} from "@/validation/doctors/schemas/doctor.schema";

interface ViewDoctorActionProps {
    doctor: Doctor;
}

export function ViewDoctorAction({doctor}: ViewDoctorActionProps) {
    return (
        <DropdownMenuItem asChild className="justify-center">
            <Link href={`/dashboard/doctors/${doctor.doctor_id}`}>
                عرض التفاصيل
            </Link>
        </DropdownMenuItem>
    );
}
