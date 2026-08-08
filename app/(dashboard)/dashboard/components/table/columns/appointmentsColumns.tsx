import {ColumnDef} from "@tanstack/react-table";

import {Appointment} from "@/validation/appointments/schemas/appointment.schema";

import {AppointmentStatusBadge} from "../badges/AppointmentStatusBadge";
import {AppointmentActions} from "../actions/AppointmentActions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const appointmentsColumns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "patient_name",
        header: "المريض",
        cell: ({row}) => (
            <div className="space-y-1">
                <p className="font-medium">{row.original.patient_name}</p>

                <p className="text-sm text-muted-foreground">
                    {row.original.patient_phone}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "doctor",
        header: "الطبيب",
        cell: ({row}) => (
            <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage
                        src={row.original.doctor_schedule?.doctor.path_image}
                    />

                    <AvatarFallback>
                        {row.original.doctor_schedule?.doctor.full_name.charAt(
                            0,
                        )}
                    </AvatarFallback>
                </Avatar>

                <span>{row.original.doctor_schedule?.doctor?.full_name}</span>
            </div>
        ),
    },
    {
        accessorKey: "appointment_date",
        header: "موعد الحجز",
        cell: ({row}) =>
            new Date(row.original.appointment_date).toLocaleDateString(),
    },
    {
        accessorKey: "total_amount",
        header: "المبلغ",
        cell: ({row}) => `${row.original.total_amount.toLocaleString()} ر.ي`,
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({row}) => (
            <AppointmentStatusBadge status={row.original.status} />
        ),
    },
    {
        accessorKey: "created_at",
        header: "تاريخ الإنشاء",
        cell: ({row}) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "التفاصيل",
        cell: ({row}) => <AppointmentActions appointment={row.original} />,
        enableSorting: false,
        enableHiding: false,
    },
];
