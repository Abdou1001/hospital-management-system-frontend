"use client";

import {Eye} from "lucide-react";

import {Appointment} from "@/validation/appointments/schemas/appointment.schema";

import {Button} from "@/components/ui/button";
import Link from "next/link";

interface AppointmentActionsProps {
    appointment: Appointment;
}

export function AppointmentActions({appointment}: AppointmentActionsProps) {
    return (
        <Link href={`appointments/${appointment.appointment_id}`}>
            <Button variant={"outline"}>
                <Eye />
            </Button>
        </Link>
    );
}
