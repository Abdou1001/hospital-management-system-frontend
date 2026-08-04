"use client";

import Image from "next/image";
import {ColumnDef} from "@tanstack/react-table";

import {Badge} from "@/components/ui/badge";

import {Ad} from "@/types/data";

import AdvertisementActions from "../actions/advertisementActions";

export const adsColumns: ColumnDef<Ad>[] = [
    {
        accessorKey: "image_url",
        header: "الصورة",
        cell: ({row}) => (
            <Image
                src={row.original.image_url ?? "/public/next.svg"}
                alt="Advertisement"
                width={70}
                height={70}
                className="h-16 w-24 rounded-md border object-cover"
            />
        ),
    },

    {
        accessorKey: "start_date",
        header: "تاريخ البداية",
    },

    {
        accessorKey: "end_date",
        header: "تاريخ الانتهاء",
    },

    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({row}) => {
            const active = row.original.status === "active";

            return (
                <Badge variant={active ? "default" : "secondary"}>
                    {active ? "مفعل" : "غير مفعل"}
                </Badge>
            );
        },
    },

    {
        id: "actions",
        header: "الإجراءات",
        cell: ({row}) => <AdvertisementActions ad={row.original} />,
    },
];
