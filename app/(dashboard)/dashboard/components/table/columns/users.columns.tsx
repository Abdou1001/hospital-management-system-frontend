import {ColumnDef} from "@tanstack/react-table";

import {User} from "@/validation/users/schemas/user.schema";

import {RoleBadge} from "../badges/RoleBadge";
import {StatusBadge} from "../badges/StatusBadge";
import {UserActions} from "../actions/UserActions";

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "full_name",
        header: "الاسم",
    },
    {
        accessorKey: "phone_number",
        header: "رقم الهاتف",
    },
    {
        accessorKey: "gender",
        header: "الجنس",
    },
    {
        accessorKey: "age",
        header: "العمر",
    },
    {
        accessorKey: "role",
        header: "الصلاحية",
        cell: ({row}) => <RoleBadge role={row.original.role} />,
    },
    {
        accessorKey: "is_active",
        header: "الحالة",
        cell: ({row}) => <StatusBadge status={row.original.is_active} />,
    },
    {
        accessorKey: "created_at",
        header: "تاريخ الإنشاء",
        cell: ({row}) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "الإجراءات",
        cell: ({row}) => <UserActions user={row.original} />,
        enableSorting: false,
        enableHiding: false,
    },
];
