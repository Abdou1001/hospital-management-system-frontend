"use client";

import {ColumnDef} from "@tanstack/react-table";

import {Department} from "@/validation/departments/schemas/department.schema";

import Image from "next/image";
import DepartmentActions from "../actions/DepartmentActions";


export const departmentColumns: ColumnDef<Department>[] = [
    /* ==========================================
        صورة القسم
    ========================================== */
    {
        accessorKey: "path_image",
        header: "الصورة",

        cell: ({row}) => {
            const image = row.original.path_image ?? "/1770063447309.jpg";
            console.log(row.original.path_image)
            return (
                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                    <Image
                        src={image}
                        alt={row.original.depart_name}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
    },

    /* ==========================================
        اسم القسم
    ========================================== */
    {
        accessorKey: "depart_name",
        header: "اسم القسم",
    },

    /* ==========================================
        عدد الأطباء
    ========================================== */
    {
        accessorKey: "doctors_count",
        header: "عدد الأطباء",

        cell: ({row}) => (
            <span className="font-medium">{row.original.doctors_count}</span>
        ),
    },

    /* ==========================================
        الإجراءات
    ========================================== */
    {
        id: "actions",
        header: "الإجراءات",

        cell: ({row}) => <DepartmentActions department={row.original} />,
    },
];
