import {ColumnDef} from "@tanstack/react-table";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {Doctor} from "@/validation/doctors/schemas/doctor.schema";

import {StatusBadge} from "../badges/StatusBadge";
import {DoctorActions} from "../actions/DoctorActions";

export const doctorsColumns: ColumnDef<Doctor>[] = [
    {
        accessorKey: "full_name",
        header: "الطبيب",
        cell: ({row}) => (
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={row.original.path_image ?? ""} />

                    <AvatarFallback>
                        {row.original.full_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <p className="font-medium">{row.original.full_name}</p>

                    <p className="text-sm text-muted-foreground">
                        {row.original.email ?? "لا يوجد بريد إلكتروني"}
                    </p>
                </div>
            </div>
        ),
    },

    {
        accessorKey: "doctor_department",
        header: "القسم",
        cell: ({row}) => {
            const departments = row.original.doctor_department;

            if (!departments.length) {
                return <span className="text-muted-foreground">-</span>;
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {departments.map((item) => (
                        <span
                            key={item.doctor_deprtment_id}
                            className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                            {item.department.depart_name}
                        </span>
                    ))}
                </div>
            );
        },
    },

    {
        accessorKey: "gender",
        header: "الجنس",
    },

    {
        accessorKey: "years_exper",
        header: "سنوات الخبرة",
        cell: ({row}) => `${row.original.years_exper} سنة`,
    },

    {
        accessorKey: "consultation_fee",
        header: "رسوم الكشف",
        cell: ({row}) =>
            `${row.original.consultation_fee.toLocaleString()} ر.ي`,
    },

    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({row}) => <StatusBadge status={row.original.status} />,
    },

    {
        accessorKey: "is_hidden",
        header: "الظهور",
        cell: ({row}) =>
            row.original.is_hidden ? (
                <span className="font-medium text-red-600">مخفي</span>
            ) : (
                <span className="font-medium text-green-600">ظاهر</span>
            ),
    },

    {
        id: "actions",
        header: "الإجراءات",
        cell: ({row}) => <DoctorActions doctor={row.original} />,
        enableSorting: false,
        enableHiding: false,
    },
];
