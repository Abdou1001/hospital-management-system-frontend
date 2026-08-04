"use client";

import {MoreHorizontal} from "lucide-react";

import {Doctor} from "@/validation/doctors/schemas/doctor.schema";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {ViewDoctorAction} from "../../dialogs/view-doctor-dialog";
import {EditDoctorAction} from "../../dialogs/edit-doctor-dialog";
import {ChangeStatusDialog} from "../../dialogs/change-doctor-status-dialog";
import {HideDoctorDialog} from "../../dialogs/hide-doctor-dialog";

interface DoctorActionsProps {
    doctor: Doctor;
}

export function DoctorActions({doctor}: DoctorActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
                <ViewDoctorAction doctor={doctor} />

                <EditDoctorAction doctor={doctor} />

                <DropdownMenuSeparator />

                <ChangeStatusDialog doctor={doctor} />

                <HideDoctorDialog doctor={doctor} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
